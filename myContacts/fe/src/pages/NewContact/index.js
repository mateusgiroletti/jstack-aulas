import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function NewContact() {
    async function handleSubmit(formData) {
        try {
            const contact = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                categoryId: formData.categoryId
            };

            await ContactsService.createContacts(contact);

            toast({
                type: "success",
                text: "Contato cadastrado com sucesso!",
                duration: 8000
            });

        } catch (error) {
            toast({
                type: "danger",
                text: "Erro ao cadastrar contato!"
            });
        }

    }

    return (
        <>
            <PageHeader
                title="Novo Contato"
            />

            <ContactForm
                buttonLabel="Cadastrar"
                onSubmit={handleSubmit}
            />
        </>
    );
}