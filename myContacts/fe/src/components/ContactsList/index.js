import { Container, Header, ListContainer, Card } from "./styles";

import arrow from "../../assets/icons/arrow.svg";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";

export default function ContactList() {
    return (
        <Container>
            <Header>
                <strong>3 contatos</strong>
                <a href="/">Novo contato</a>
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
                        <a href="/">
                            <img src={edit} alt="Edit" />
                        </a>
                        <button type="button">
                            <img src={trash} alt="Edit" />
                        </button>
                    </div>
                </Card>
            </ListContainer>
        </Container>
    );
}