import Loader from "../../components/Loader";
import useHome from "./useHome";
import InputSearch from "./components/InputSearch";

import Header from "./components/Header";
import ErrorStatus from "./components/ErrorStatus";
import EmptyList from "./components/EmptyList";

import { Container } from "./styles";
import SearchNotFound from "./components/SearchNotFound";
import ContactList from "./components/ContactList";
import Modal from "../../components/Modal";

export default function Home() {
    const {
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
    } = useHome();

    const hasContacts = contacts.length > 0;
    const isListEmpty = !hasError && (!isLoading && !hasContacts);
    const isSerachEmpty = !hasError && (filteredContacts.length < 1 && hasContacts);

    return (
        <Container>
            <Loader isLoading={isLoading} />

            {hasContacts && (
                <InputSearch
                    value={searchTerm}
                    onChange={handleChangeSearchTerm}
                />
            )}

            <Header
                hasError={hasError}
                quantityOfContacts={contacts.length}
                quantityOfFilteredContacts={filteredContacts.length}
            />

            {hasError && (<ErrorStatus onTryAgain={handleTryAgain} />)}
            {isListEmpty && <EmptyList />}
            {isSerachEmpty && <SearchNotFound searchTerm={searchTerm} />}

            {hasContacts && (
                <>
                    {isPending && <h1>Carregando....</h1>}
                    
                    <ContactList
                        filteredContacts={filteredContacts}
                        orderBy={orderBy}
                        onToggleOrderBy={handleToggleOrderBy}
                        onDeleteContact={handleDeleteContact}
                    />

                    <Modal
                        danger
                        isLoading={isLoadingDelete}
                        visible={isDeleteModalVisible}
                        title={`Tem certeza que deseja remover o contato ${contactBeingDeleted?.name}?`}
                        confirmLabel="Deletar"
                        onCancel={handleCloseDeleteModal}
                        onConfirm={handleConfirmDeleteContact}
                    >
                        <p>Esta ação não poderá ser desfeitas!</p>
                    </Modal>
                </>
            )}

        </Container>
    );
}

