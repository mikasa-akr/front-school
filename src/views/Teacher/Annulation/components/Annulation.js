import React, { useState } from 'react';
import axios from 'axios';

const Annulation = () => {
    const [reason, setReason] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleAnnulation = async () => {
        try {
            const response = await axios.post('/annulation/teacher/123', { reason });
            setSuccessMessage(response.data.message);
            setErrorMessage('');
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('An unexpected error occurred');
            }
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h2>Annulation Page</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAnnulation(); }}>
                <label>
                    Reason for cancellation:
                    <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
            {errorMessage && <p>Error: {errorMessage}</p>}
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
};

export default Annulation;
