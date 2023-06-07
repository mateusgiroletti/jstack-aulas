import { Container } from "./styles";
import PropyTypes from "prop-types";

import arrow from "../../assets/icons/arrow.svg";

import { Link } from "react-router-dom";

export default function PageHeader({ title }) {
    return (
        <Container>
            <Link to="/">
                <img src={arrow}></img>
                <span>Voltar</span>
            </Link>

            <h1>{title}</h1>
        </Container>
    );
}

PageHeader.propTypes = {
    title: PropyTypes.string.isRequired
};