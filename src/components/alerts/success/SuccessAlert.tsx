import React from 'react';
import './SuccessAlert.css';

interface SuccessAlertProps {
    message: string;
    show: boolean; // New prop to control visibility
    onClose: () => void; // Prop for close handler
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({ message, show, onClose }) => {
    return (
        <div className={`success-alert ${show ? 'show' : ''}`}>
            <span className="icon">✔️</span>
            {message}
            <button onClick={onClose} className="close-button">✖️</button> {/* Close button */}
        </div>
    );
};

export default SuccessAlert;