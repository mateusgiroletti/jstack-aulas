import { useEffect, useState } from "react";
import ToastMessage from "../ToastMessage";
import { Container } from "./styles";

export default function ToastContainer() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        function handleAddToast(event) {
            setMessages((prevState) => [
                ...prevState,
                {
                    id: Math.random(),
                    type: event.detail.type,
                    text: event.detail.text,
                }
            ]);
        }

        document.addEventListener("addtoast", handleAddToast);

        return () => {
            document.removeEventListener("addtoast", handleAddToast);
        };
    }, []);

    return (
        <Container>
            {messages?.map((message) => (
                <ToastMessage
                    key={message.id}
                    type={message.type}
                    text={message.text}
                />
            ))}
        </Container>
    );
}