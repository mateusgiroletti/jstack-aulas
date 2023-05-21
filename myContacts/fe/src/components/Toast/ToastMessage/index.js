import PropTypes from "prop-types";

import xCircleIcon from "../../../assets/icons/x-circle.svg";
import checkCircleIcon from "../../../assets/icons/check-circle.svg";

import { Container } from "./styles";

export default function ToastMessage({ message, onRemoveMessage }) {
    function handleRemoveToast() {
        onRemoveMessage(message.id);
    }

    return (
        <Container type={message.type} onClick={handleRemoveToast}>
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
    }).isRequired,
    onRemoveMessage: PropTypes.func.isRequired
};