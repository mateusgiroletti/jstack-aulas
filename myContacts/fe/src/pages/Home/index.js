import { Link } from "react-router-dom";

import arrow from "../../assets/icons/arrow.svg";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";

import { Container, InputSearchContainer, Header, ListContainer, Card } from "./styles";

export default function Home() {
    return (
        <Container>

            <InputSearchContainer>
                <input type="text" placeholder="Pesquisar contato" />
            </InputSearchContainer>

            <Header>
                <strong>3 contatos</strong>
                <Link to="/new">Novo contato</Link>
            </Header>

            <ListContainer>
                <header>
                    <button type="button">
                        <span>Nome</span>
                        <img src={arrow} />
                    </button>
                </header>

                <Card>
                    <div className="info">
                        <div className="contact-name">
                            <strong>Mateus Giroletti</strong>
                            <small>instagram</small>
                        </div>
                        <span>email@mail.com</span>
                        <span>(99) 99999-9999</span>
                    </div>

                    <div className="actions">
                        <Link to="/edit/123">
                            <img src={edit} alt="Edit" />
                        </Link>
                        <button type="button">
                            <img src={trash} alt="Edit" />
                        </button>
                    </div>
                </Card>
            </ListContainer>
        </Container>
    );
}