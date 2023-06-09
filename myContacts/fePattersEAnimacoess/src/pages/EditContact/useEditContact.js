import { useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import toast from "../../utils/toast";

import ContactsService from "../../services/ContactsService";
import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";

export default function useEditContact() {
    const [isLoading, setIsLoading] = useState(true);
    const [contactName, setContactName] = useState("");
    const contactFormRef = useRef("");

    const history = useHistory();
    const { id } = useParams();
    const safeAsyncAction = useSafeAsyncAction();

    useEffect(() => {
        async function loadContact() {
            try {
                const contact = await ContactsService.getContactById(id);

                safeAsyncAction(() => {
                    contactFormRef.current.setFieldsValues(contact);
                    setIsLoading(false);
                    setContactName(contact.name);
                });


            } catch {
                safeAsyncAction(() => {
                    history.push("/");
                    toast({
                        type: "danger",
                        text: "Contato não encontrado!"
                    });
                });
            }
        }

        loadContact();
    }, [id, history, safeAsyncAction]);

    async function handleSubmit(formData) {
        try {
            const contactData = await ContactsService.updateContacts(id, formData);

            setContactName(contactData.name);

            toast({
                type: "success",
                text: "Contato editado com sucesso!",
                duration: 8000
            });

        } catch (error) {
            toast({
                type: "danger",
                text: "Erro ao editar contato!"
            });
        }
    }

    return {
        isLoading,
        contactName,
        contactFormRef,
        handleSubmit
    };
}