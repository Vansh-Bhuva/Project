import React from "react";

const SummaryCard = ({ title, amount, color = "bg-blue-500", className = "text-black" }) => {
    return (
        <div className={`w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 
                         p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl shadow-lg 
                         ${color} ${className}  flex flex-col 
                         items-center md:items-start transition-all duration-300 hover:scale-105`}>
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
                {title}
            </h3>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-2">
            ₹{amount}
            </p>
        </div>
    );
};

export default SummaryCard;
