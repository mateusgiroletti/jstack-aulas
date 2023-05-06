import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

import arrow from "../../assets/icons/arrow.svg";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";

import Loader from "../../components/Loader";

import { Container, InputSearchContainer, Header, ListContainer, Card } from "./styles";
import { delay } from "../../utils/helpers";

export default function Home() {
    const [contacts, setContacts] = useState([]);
    const [orderBy, setOrderBy] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        async function loadContacts() {
            try {
                const response = await fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`);
                await delay();

                const json = await response.json();
                setContacts(json);
            } catch (error) {
                console.log("erro", error);
            } finally {
                setIsLoading(false);
            }
        }

        loadContacts();
    }, [orderBy]);

    const filteredContacts = useMemo(() => contacts.filter((contact) => (
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    )), [contacts, searchTerm]);

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

            <Header>
                <strong>
                    {filteredContacts.length}
                    {filteredContacts.length === 1 ? " contato" : " contatos"}
                </strong>
                <Link to="/new">Novo contato</Link>
            </Header>

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

