import { useEffect, useState, useMemo, useCallback } from "react";

import ContactsService from "../../services/ContactsService";

import toast from "../../utils/toast";

export default function useHome() {
    const [contacts, setContacts] = useState([]);
    const [orderBy, setOrderBy] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisibel] = useState(false);
    const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

    const loadContacts = useCallback(async () => {
        try {
            setIsLoading(true);

            const contactsList = await ContactsService.listContacts(orderBy);

            setHasError(false);
            setContacts(contactsList);
        } catch (error) {
            setHasError(true);
            setContacts([]);
        } finally {
            setIsLoading(false);
        }
    }, [orderBy]);

    useEffect(() => {
        loadContacts();
    }, [loadContacts]);

    const filteredContacts = useMemo(() => contacts.filter((contact) => (
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    )), [contacts, searchTerm]);

    function handleTryAgain() {
        loadContacts();
    }

    function handleToggleOrderBy() {
        setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
    }

    function handleChangeSearchTerm(event) {
        setSearchTerm(event.target.value);
    }

    function handleDeleteContact(contact) {
        setIsDeleteModalVisibel(true);
        setContactBeingDeleted(contact);
    }

    function handleCloseDeleteModal() {
        setIsDeleteModalVisibel(false);
    }

    async function handleConfirmDeleteContact() {
        try {
            setIsLoadingDelete(true);
            await ContactsService.deleteContact(contactBeingDeleted.id);

            toast({
                type: "success",
                text: "Contato deletado com sucesso!"
            });

            handleCloseDeleteModal();
            loadContacts();
        } catch {
            toast({
                type: "danger",
                text: "Ocorreu um erro ao tentar deletar o contato!"
            });
        }
    }

    return {
        isLoading,
        isLoadingDelete,
        isDeleteModalVisible,
        contactBeingDeleted,
        handleCloseDeleteModal,
        handleConfirmDeleteContact,
        contacts,
        searchTerm,
        handleChangeSearchTerm,
        hasError,
        handleTryAgain,
        orderBy,
        handleToggleOrderBy,
        handleDeleteContact,
        filteredContacts
    };

}