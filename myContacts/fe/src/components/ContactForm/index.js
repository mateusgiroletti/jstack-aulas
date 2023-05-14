import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { formatPhone, isEmailValid } from "../../utils/helpers";

import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";

import useErrors from "../../hooks/useErrors";

import { Form, ButtonContainer } from "./styles";
import CategoryService from "../../services/CategoryService";

export default function ContactForm({ buttonLabel }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    const { setError, removeError, getErrorMessageByFieldName } = useErrors();

    useEffect(() => {
        async function loadCategories() {
            try {
                const categoriesList = await CategoryService.listCategories();

                setCategories(categoriesList);
            } catch { } finally {
                setIsLoadingCategories(false);
            }
        }

        loadCategories();
    }, []);

    function handleNameChange(event) {
        setName(event.target.value);

        if (!event.target.value) {
            setError({ field: "name", message: "Nome é obrigátorio" });
        } else {
            removeError("name");
        }
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);

        if (event.target.value && !isEmailValid(event.target.value)) {
            setError({ field: "email", message: "Email inválido" });
        } else {
            removeError("email");
        }
    }

    function handlePhoneChange(event) {
        setPhone(formatPhone(event.target.value));
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log({
            name, email, phone: phone.replace(/\D/g, ""), categoryId
        });
    }

    return (
        <Form onSubmit={handleSubmit} noValidate>
            <FormGroup error={getErrorMessageByFieldName("name")}>
                <Input
                    value={name}
                    placeholder="Nome"
                    onChange={handleNameChange}
                    error={getErrorMessageByFieldName("name")}
                />
            </FormGroup>

            <FormGroup error={getErrorMessageByFieldName("email")}>
                <Input
                    type="email"
                    value={email}
                    placeholder="E-mail"
                    onChange={handleEmailChange}
                    error={getErrorMessageByFieldName("email")}
                />
            </FormGroup>

            <FormGroup>
                <Input
                    value={phone}
                    placeholder="Telefone"
                    onChange={handlePhoneChange}
                    maxLength="15"
                />
            </FormGroup>

            <FormGroup isLoading={isLoadingCategories}>
                <Select
                    value={categoryId}
                    onChange={(event) => setCategoryId(event.target.value)}
                    disabled={isLoadingCategories}
                >
                    <option value="">Sem Categoria</option>

                    {categories?.map((category) => (
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                    ))}

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