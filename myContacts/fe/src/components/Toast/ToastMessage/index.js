import PropTypes from "prop-types";

import xCircleIcon from "../../../assets/icons/x-circle.svg";
import checkCircleIcon from "../../../assets/icons/check-circle.svg";

import { Container } from "./styles";
import { useEffect } from "react";

export default function ToastMessage({ message, onRemoveMessage }) {
    useEffect(() => {
        const idSetTimeout = setTimeout(() => {
            onRemoveMessage(message.id);
        }, message.duration || 3000);

        return () => {
            clearTimeout(idSetTimeout);
        };

    }, [message, onRemoveMessage]);

    function handleRemoveToast() {
        onRemoveMessage(message.id);
    }

    return (
        <Container
            type={message.type}
            onClick={handleRemoveToast}
            tabIndex={0}
            role="button"
        >
            {message.type === "danger" && <img src={xCircleIcon} />}
            {message.type === "success" && <img src={checkCircleIcon} />}

            <strong>{message.text}</strong>
        </Container>
    );
}

ToastMessage.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["default", "success", "danger"]),
        duration: PropTypes.number
    }).isRequired,
    onRemoveMessage: PropTypes.func.isRequired
};