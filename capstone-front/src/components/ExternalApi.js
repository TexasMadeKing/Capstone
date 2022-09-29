import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import axios from "axios";

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
            })
            console.log(response.data)
            setShowResult(true);
            setApiMessage(response.data.msg);

        } catch (error) {
            console.error({ error });
        }

    }

    return (
        <>
            <h1>External API</h1>
            <button onClick={callApi}>Ping API</button>
            <card className="card">
                {showResult && (
                    <div>
                        <h5>Result</h5>
                        <p>{apiMessage}</p>
                        <p>(response.data)</p>
                    </div>
                )}
            </card>
            {showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
        </>
    );
};

export default ExternalApi;