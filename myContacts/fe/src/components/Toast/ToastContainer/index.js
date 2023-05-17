import ToastMessage from "../ToastMessage";
import { Container } from "./styles";

export default function ToastContainer() {
    return (
        <Container>
            <ToastMessage message="Deftault" />
            <ToastMessage message="Error" type="danger" />
            <ToastMessage message="Success" type="success" />
        </Container>
    );
}