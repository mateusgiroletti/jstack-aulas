import { useState } from "react";
import ToastMessage from "../ToastMessage";
import { Container } from "./styles";

export default function ToastContainer() {
    const [messages] = useState([
        { id: Math.random(), type: "default", text: "Default texte" },
        { id: Math.random(), type: "danger", text: "Danger texte" },
        { id: Math.random(), type: "success", text: "Success texte" }
    ]);

    console.log(messages);
    return (
        <Container>
            {messages.map((message) => (
                <ToastMessage
                    key={message.id}
                    type={message.type}
                    text={message.text}
                />
            ))}
        </Container>
    );
}