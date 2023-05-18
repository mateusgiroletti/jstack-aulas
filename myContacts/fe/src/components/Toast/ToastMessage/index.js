import PropTypes from "prop-types";

import xCircleIcon from "../../../assets/icons/x-circle.svg";
import checkCircleIcon from "../../../assets/icons/check-circle.svg";

import { Container } from "./styles";

export default function ToastMessage({ text, type }) {
    return (
        <Container type={type}>
            {type === "danger" && <img src={xCircleIcon} />}
            {type === "success" && <img src={checkCircleIcon} />}

            <strong>{text}</strong>
        </Container>
    );
}

ToastMessage.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["default", "success", "danger"])
};

ToastMessage.defaultProps = {
    type: "default"
};