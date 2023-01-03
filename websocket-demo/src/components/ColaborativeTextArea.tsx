import { Box, Heading, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IMessageEvent, w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

const ColaborativeTextArea = () => {
    const [text, setText] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        client.onopen = () => {
            console.log("WebSocket Client Connected");
        };
        client.onmessage = (message: IMessageEvent) => {
            const dataFromServer = JSON.parse(message.data.toString());
            console.log("got reply! ", dataFromServer);
            setUserId(dataFromServer.user);
            setText(dataFromServer.data);
        };
    }, []);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        client.send(e.target.value);
    };

    return (
        <Box minH={500} minW="80%">
            <Heading>Welcome {userId}!</Heading>
            <Textarea minH={500}  value={text} onChange={handleTextChange} />
        </Box>
    );
};

export default ColaborativeTextArea;
