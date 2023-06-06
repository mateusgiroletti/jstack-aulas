import PropTypes from "prop-types";

import Button from "../Button";

import { Overlay, Container, Footer } from "./styles";
import ReactPortal from "../ReactPortal";

export default function Modal({
    danger,
    visible,
    isLoading,
    title,
    children,
    cancelLabel,
    confirmLabel,
    onCancel,
    onConfirm
}) {

    if (!visible) {
        return null;
    }


    const container = document.createElement("div");
    container.setAttribute("id", "modal-root");
    document.body.appendChild(container);

    return (
        <ReactPortal containerId="modal-root">
            <Overlay>
                <Container danger={danger}>
                    <h1>{title}</h1>

                    <div className="modal-body">
                        {children}
                    </div>

                    <Footer>
                        <button
                            type="buttton"
                            className="cancel-button"
                            onClick={onCancel}
                            disabled={isLoading}
                        >
                            {cancelLabel}
                        </button>

                        <Button
                            isLoading={isLoading}
                            danger={danger}
                            onClick={onConfirm}
                        >
                            {confirmLabel}
                        </Button>
                    </Footer>
                </Container>
            </Overlay>
        </ReactPortal>
    );
}

Modal.propTypes = {
    danger: PropTypes.bool,
    visible: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    cancelLabel: PropTypes.string,
    confirmLabel: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};


Modal.defaultProps = {
    danger: false,
    isLoading: false,
    cancelLabel: "Cancelar",
    confirmLabel: "Confirmar"
};