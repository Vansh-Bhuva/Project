import { forwardRef } from "react";

const Input = ({ label, type = "text", ...props }, ref) => {
    return (
        <div className="flex flex-col mb-4">
            {label && <label className="text-gray-700 dark:text-amber-300 font-medium mb-1">{label}</label>}
            <input
                type={type}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300  dark:text-amber-300"
                ref={ref} // ✅ Correctly forwarding the ref
                {...props} // ✅ Ensures other props like `placeholder`, `onChange`, and `register` work
            />
        </div>
    );
};

export default forwardRef(Input);
