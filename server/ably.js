import { configureAbly, useChannel } from "@ably-labs/react-hooks";
import React, { useState, useEffect } from "react";
configureAbly({ key: process.env.ABLY_API_KEY});
const [messages, updateMessages] = useState([]);
const [channel] = useChannel("channel-name", (message) => {
    updateMessages((prev) => [...prev, message]);
});

// Convert the messages to list items to render in a React component
const messagePreviews = messages.map((msg, index) => <li key={index}>{msg.data.someProperty}</li>);

export default messages