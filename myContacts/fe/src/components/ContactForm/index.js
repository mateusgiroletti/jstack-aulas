import { useState } from "react";
import PropTypes from "prop-types";

import { isEmailValid } from "../../utils/helpers";

import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";

import { Form, ButtonContainer } from "./styles";

export default function ContactForm({ buttonLabel }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [category, setCategory] = useState("");
    const [errors, setErrors] = useState([]);

    function handleNameChange(event) {
        setName(event.target.value);

        if (!event.target.value) {
            setErrors((prevState) => [
                ...prevState,
                { field: "name", message: "Nome é obrigátorio" }
            ]);
        } else {
            setErrors((prevState) => prevState.filter(
                (error) => error.field !== "name",
            ));
        }
    }

    function handleEmail(event) {
        setEmail(event.target.value);

        if (event.target.value && !isEmailValid(event.target.value)) {
            const errorAlreadyExists = errors.find((error) => error.field === "email");

            if (errorAlreadyExists) {
                return;
            }

            setErrors((prevState) => [
                ...prevState,
                { field: "email", message: "Email é obrigátorio" }
            ]);
        } else {
            setErrors((prevState) => prevState.filter(
                (error) => error.field !== "name",
            ));
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log({
            name, email, phone, category
        });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Input
                    value={name}
                    placeholder="Nome"
                    onChange={handleNameChange}
                />
            </FormGroup>

            <FormGroup>
                <Input
                    value={email}
                    placeholder="E-mail"
                    onChange={handleEmail}
                />
            </FormGroup>

            <FormGroup>
                <Input
                    value={phone}
                    placeholder="Telefone"
                    onChange={(event) => setPhone(event.target.value)}
                />
            </FormGroup>

            <FormGroup>
                <Select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                >
                    <option value="">Categoria</option>
                    <option value="instagram">Instagram</option>
                    <option value="discord">Discord</option>
                </Select>
            </FormGroup>

            <ButtonContainer>
                <Button type="submit" >
                    {buttonLabel}
                </Button>
            </ButtonContainer>
        </Form>
    );
}

ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};