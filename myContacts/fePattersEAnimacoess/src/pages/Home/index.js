/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

import arrow from "../../assets/icons/arrow.svg";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import sad from "../../assets/images/sad.svg";
import emptyBox from "../../assets/images/empty-box.svg";
import magnifierQuestion from "../../assets/images/magnifier-question.svg";

import Loader from "../../components/Loader";

import Button from "../../components/Button";

import { Container, InputSearchContainer, Header, ListContainer, Card, ErrorContatiner, EmptyListContainer, SearchNotFoundContainer } from "./styles";
import Modal from "../../components/Modal";
import useHome from "./useHome";

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
        filteredContacts
    } = useHome();

    return (
        <Container>
            <Loader isLoading={isLoading} />

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

            {contacts.length > 0 && (
                <InputSearchContainer>
                    <input
                        value={searchTerm}
                        type="text"
                        placeholder="Pesquisar contato"
                        onChange={handleChangeSearchTerm}
                    />
                </InputSearchContainer>
            )}

            <Header
                justifyContent={
                    hasError
                        ? "flex-end"
                        : (
                            contacts.length > 0
                                ? "space-between"
                                : "center"
                        )
                }
            >
                {(!hasError && contacts.length > 0) && (
                    <strong>
                        {filteredContacts.length}
                        {filteredContacts.length === 1 ? " contato" : " contatos"}
                    </strong>
                )}
                <Link to="/new">Novo contato</Link>
            </Header>

            {hasError && (
                <ErrorContatiner>
                    <img src={sad} alt="Sad" />
                    <div className="details">
                        <strong>Ocorreu um erro ao obter os seus contatos!</strong>
                        <Button type="button" onClick={handleTryAgain}>
                            Tentar Novamente
                        </Button>
                    </div>
                </ErrorContatiner>
            )}

            {!hasError && (
                <>
                    {(contacts.length < 1 && !isLoading) && (
                        <EmptyListContainer>
                            <img src={emptyBox} alt="Empty box" />

                            <p>
                                Você ainda não tem nenhum contato cadastrado!
                                Clique no botão <strong>"Novo contato"</strong> à cima
                                para cadastrar o seu primeiro!
                            </p>
                        </EmptyListContainer>
                    )}

                    {(filteredContacts.length < 1 && !isLoading) && (
                        <SearchNotFoundContainer>
                            <img src={magnifierQuestion} alt="Magnifer question" />

                            <span>
                                Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>
                            </span>
                        </SearchNotFoundContainer>
                    )}

                    {filteredContacts.length > 0 && (
                        <ListContainer orderBy={orderBy}>
                            <button type="button" onClick={handleToggleOrderBy}>
                                <span>Nome</span>
                                <img src={arrow} alt="Arrow" />
                            </button>
                        </ListContainer>
                    )}

                    {filteredContacts.map((contact) => (
                        <Card key={contact.id}>
                            <div className="info">
                                <div className="contact-name">
                                    <strong>{contact.name}</strong>
                                    {contact.category.name && (
                                        <small>{contact.category.name}</small>
                                    )}
                                </div>
                                <span>{contact.email}</span>
                                <span>{contact.phone}</span>
                            </div>

                            <div className="actions">
                                <Link to={`/edit/${contact.id}`}>
                                    <img src={edit} alt="Edit" />
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteContact(contact)}
                                >
                                    <img src={trash} alt="Delete" />
                                </button>
                            </div>
                        </Card>
                    ))}
                </>
            )}
        </Container>
    );
}

