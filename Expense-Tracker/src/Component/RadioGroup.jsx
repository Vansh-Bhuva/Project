import { forwardRef } from "react";

const RadioGroup = ({ label, name, options, ...props }, ref) => {
    return (
        <div className="flex flex-col mb-4">
            {label && <label className="text-gray-700 dark:text-amber-300 font-medium mb-1">{label}</label>}
            <div className="flex space-x-4">
                {options.map((option) => (
                    <label key={option.value} className="flex items-center space-x-2 ">
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            className="form-radio text-blue-500 w-6 h-6 dark:bg-amber-300"
                            ref={ref}
                            {...props}
                        />
                        <span className="text-gray-700 dark:text-amber-300">{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default forwardRef(RadioGroup);
