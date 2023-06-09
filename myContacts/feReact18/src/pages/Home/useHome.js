import { useEffect, useState, useCallback, useMemo, useDeferredValue } from "react";

import ContactsService from "../../services/ContactsService";

import toast from "../../utils/toast";

export default function useHome() {
    const [contacts, setContacts] = useState([]);
    const [orderBy, setOrderBy] = useState("asc");
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisibel] = useState(false);
    const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const deferredSearchTerm = useDeferredValue(searchTerm);

    const filteredContacts = useMemo(() => contacts.filter((contact) => (
        contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    )), [contacts, deferredSearchTerm]);

    const loadContacts = useCallback(async (signal) => {
        try {
            setIsLoading(true);

            const contactsList = await ContactsService.listContacts(orderBy, signal);

            setHasError(false);
            setContacts(contactsList);
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
                return;
            }

            setHasError(true);
            setContacts([]);
        } finally {
            setIsLoading(false);
        }
    }, [orderBy]);

    useEffect(() => {
        const abortController = new AbortController();

        loadContacts(abortController.signal);


        return () => {
            abortController.abort();
        };
    }, [loadContacts]);

    function handleTryAgain() {
        loadContacts();
    }

    const handleToggleOrderBy = useCallback(() => {
        setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
    }, []);

    function handleChangeSearchTerm(event) {
        const { value } = event.target;

        setSearchTerm(value);
    }

    const handleDeleteContact = useCallback((contact) => {
        setIsDeleteModalVisibel(true);
        setContactBeingDeleted(contact);
    }, []);

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
        } finally {
            setIsLoadingDelete(false);
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