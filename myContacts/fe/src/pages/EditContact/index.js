import { useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import Loader from "../../components/Loader";

import toast from "../../utils/toast";

import ContactsService from "../../services/ContactsService";

export default function EditContact() {
    const [isLoading, setIsLoading] = useState(true);
    const [contactName, setContactName] = useState("");
    const contactFormRef = useRef("");

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        async function loadContact() {
            try {
                const contact = await ContactsService.getContactById(id);

                contactFormRef.current.setFieldsValues(contact);
                setIsLoading(false);
                setContactName(contact.name);
            } catch {
                history.push("/");
                toast({
                    type: "danger",
                    text: "Contato não encontrado!"
                });
            }
        }

        loadContact();
    }, [id, history]);

    async function handleSubmit(formData) {
        try {
            const contact = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                categoryId: formData.categoryId
            };

            await ContactsService.updateContacts(id, contact);

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
        <>
            {isLoading && <Loader isLoading={isLoading} />}

            <PageHeader
                title={isLoading ? "Carregando...." : `Editar ${contactName}`}
            />

            <ContactForm
                ref={contactFormRef}
                buttonLabel="Salvar alterações"
                onSubmit={handleSubmit}
            />
        </>
    );
}