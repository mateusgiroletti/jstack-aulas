import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import toast from "../../utils/toast";

import ContactsService from "../../services/ContactsService";
import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";
import Presentation from "./Presentation";

export default function Container() {
    const [isLoading, setIsLoading] = useState(true);
    const [contactName, setContactName] = useState("");
    const contactFormRef = useRef("");

    const navigate = useNavigate();
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
                    navigate("/");
                    toast({
                        type: "danger",
                        text: "Contato não encontrado!"
                    });
                });
            }
        }

        loadContact();
    }, [id, navigate, safeAsyncAction]);

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

    return (
        <Presentation
            isLoading={isLoading}
            contactFormRef={contactFormRef}
            contactName={contactName}
            onSubmit={handleSubmit}
        />
    );
}