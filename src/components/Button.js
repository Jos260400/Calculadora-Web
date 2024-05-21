import React from 'react';
import './Button.css';

const Button = ({ label, onClick }) => {
    return (
        <button data-key={label} onClick={() => onClick(label)}>
            {label}
        </button>
    );
};

export default Button;
