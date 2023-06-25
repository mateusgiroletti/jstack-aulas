import { useEffect, useState, useCallback, useTransition } from "react";

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
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [isPending, startTransition] = useTransition();

    /* const filteredContacts = useMemo(() => contacts.filter((contact) => (
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    )), [contacts, searchTerm]); */

    const loadContacts = useCallback(async () => {
        try {
            setIsLoading(true);

            const contactsList = await ContactsService.listContacts(orderBy);

            setHasError(false);
            setContacts(contactsList);
            setFilteredContacts(contactsList);
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



    function handleTryAgain() {
        loadContacts();
    }

    const handleToggleOrderBy = useCallback(() => {
        setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
    }, []);

    function handleChangeSearchTerm(event) {
        const { value } = event.target;

        setSearchTerm(value);

        startTransition(() => {
            setFilteredContacts(contacts.filter((contact) => (
                contact.name.toLowerCase().includes(value.toLowerCase())
            )));
        });

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
        filteredContacts,
        isPending
    };

}