import React from 'react';
import './ErrorAlert.css';

interface ErrorAlertProps {
    message: string;
    show: boolean; // New prop to control visibility
    onClose: () => void; // Prop for close handler
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, show, onClose }) => {
    return (
        <div className={`error-alert ${show ? 'show' : ''}`}>
            <span className="icon">❌</span>
            {message}
            <button onClick={onClose} className="close-button">✖️</button> {/* Close button */}
        </div>
    );
};

export default ErrorAlert;