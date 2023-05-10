import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

import arrow from "../../assets/icons/arrow.svg";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import sad from "../../assets/images/sad.svg";

import Loader from "../../components/Loader";

import ContactsService from "../../services/ContactsService";

import Button from "../../components/Button";

import { Container, InputSearchContainer, Header, ListContainer, Card, ErrorContatiner } from "./styles";

export default function Home() {
    const [contacts, setContacts] = useState([]);
    const [orderBy, setOrderBy] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        loadContacts();
    }, [orderBy]);


    const filteredContacts = useMemo(() => contacts.filter((contact) => (
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    )), [contacts, searchTerm]);

    async function loadContacts() {
        try {
            setIsLoading(true);

            const contactsList = await ContactsService.listContacts(orderBy);

            setContacts(contactsList);
        } catch (error) {
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }

    function handleTryAgain(){
        loadContacts();
    }

    function handleToggleOrderBy() {
        setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
    }

    function handleChangeSearchTerm(event) {
        setSearchTerm(event.target.value);
    }

    return (
        <Container>
            <Loader isLoading={isLoading} />

            <InputSearchContainer>
                <input
                    value={searchTerm}
                    type="text"
                    placeholder="Pesquisar contato"
                    onChange={handleChangeSearchTerm}
                />
            </InputSearchContainer>

            <Header hasError={hasError}>
                {!hasError && (
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
                            {contact.category_name && (
                                <small>{contact.category_name}</small>
                            )}
                        </div>
                        <span>{contact.email}</span>
                        <span>{contact.phone}</span>
                    </div>

                    <div className="actions">
                        <Link to={`/edit/${contact.id}`}>
                            <img src={edit} alt="Edit" />
                        </Link>
                        <button type="button">
                            <img src={trash} alt="Edit" />
                        </button>
                    </div>
                </Card>
            ))}


        </Container>
    );
}

