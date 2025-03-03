import React from 'react';

const Button = ({ children, type = "button", onClick, className = "" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
