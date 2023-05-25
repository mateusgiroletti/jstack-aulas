import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

import { formatPhone, isEmailValid } from "../../utils/helpers";

import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";

import useErrors from "../../hooks/useErrors";

import { Form, ButtonContainer } from "./styles";
import CategoryService from "../../services/CategoryService";


// eslint-disable-next-line react/display-name
const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { setError, removeError, getErrorMessageByFieldName, errors } = useErrors();

    const isFormValid = (name && errors.length === 0);

    useImperativeHandle(ref, () => ({
        setFieldsValues: (contact) => {
            setName(contact.name ?? "");
            setEmail(contact.email ?? "");
            setPhone(formatPhone(contact.phone ?? ""));
            setCategoryId(contact.categoryid ?? "");
        }
    }), []);

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

    async function handleSubmit(event) {
        event.preventDefault();

        setIsSubmitting(true);

        await onSubmit(
            {
                name,
                email,
                phone: phone.replace(/\D/g, ""),
                categoryId
            }
        );

        setIsSubmitting(false);
    }

    return (
        <Form onSubmit={handleSubmit} noValidate>
            <FormGroup error={getErrorMessageByFieldName("name")}>
                <Input
                    value={name}
                    placeholder="Nome"
                    onChange={handleNameChange}
                    error={getErrorMessageByFieldName("name")}
                    disabled={isSubmitting}
                />
            </FormGroup>

            <FormGroup error={getErrorMessageByFieldName("email")}>
                <Input
                    type="email"
                    value={email}
                    placeholder="E-mail"
                    onChange={handleEmailChange}
                    error={getErrorMessageByFieldName("email")}
                    disabled={isSubmitting}
                />
            </FormGroup>

            <FormGroup>
                <Input
                    value={phone}
                    placeholder="Telefone"
                    onChange={handlePhoneChange}
                    maxLength="15"
                    disabled={isSubmitting}
                />
            </FormGroup>

            <FormGroup isLoading={isLoadingCategories}>
                <Select
                    value={categoryId}
                    onChange={(event) => setCategoryId(event.target.value)}
                    disabled={isLoadingCategories || isSubmitting}
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
                <Button
                    type="submit"
                    disabled={!isFormValid}
                    isLoading={isSubmitting}
                >
                    {buttonLabel}
                </Button>
            </ButtonContainer>
        </Form>
    );
});


ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;