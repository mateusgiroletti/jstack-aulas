import ReactDOM from "react-dom";

import { Overlay } from "./styles";
import PropTypes from "prop-types";
import Spinner from "../Spinner";

export default function Loader({ isLoading }) {
    if (!isLoading) {
        return null;
    }

    return ReactDOM.createPortal(
        <Overlay>
            <Spinner size={90}/>
        </Overlay>,
        document.getElementById("loader-root")
    );
}

Loader.propTypes = {
    isLoading: PropTypes.bool.isRequired
};