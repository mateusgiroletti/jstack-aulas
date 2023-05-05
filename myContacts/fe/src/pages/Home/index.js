import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import arrow from "../../assets/icons/arrow.svg";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";

import { Container, InputSearchContainer, Header, ListContainer, Card } from "./styles";

export default function Home() {
    const [contacts, setContacts] = useState([]);
    const [orderBy, setOrderBy] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredContacts = contacts.filter((contact) => (
        contact.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    ));

    useEffect(() => {
        fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`)
            .then(async (response) => {
                const json = await response.json();
                setContacts(json);
            })
            .catch((error) => {
                console.log("erro", error);
            });
    }, [orderBy]);

    function handleToggleOrderBy() {
        setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
    }

    function handleChangeSearchTerm(event) {
        setSearchTerm(event.target.value);
    }

    return (
        <Container>
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

