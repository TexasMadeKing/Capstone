import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import axios from "axios";
import TaskList from "./Task/TaskList";

const ExternalApi = () => {
    const [showResult, setShowResult] = useState(false);
    const [apiMessage, setApiMessage] = useState("");
    const { getTokenSilently } = useAuth0();


    const callApi = async () => {
        try {
            const token = await getTokenSilently();

            const response = await axios.get("http://localhost:5000/task", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const responseData = await response.data;

            setShowResult(true);
            setApiMessage(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h1>External API</h1>
            <p>
                This page demonstrates how to make a call to an external API.
        </p>
            <button onClick={callApi}>Ping API</button>
            <div
                style={{
                    display: showResult ? "block" : "none"
                }}
            >
                <h3>The message from the API is:</h3>
                <p>{JSON.stringify(apiMessage, null, 2)}</p>
            </div>
            {/* {showResult && (
                <code>
                    <pre>{JSON.stringify(apiMessage, null, 2)}</pre>
                </code>
            )} */}
        </div>
    );
};

export default ExternalApi;