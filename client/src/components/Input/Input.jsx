import React from "react";

const Input = ({
    label = "",
    name = "",
    type = "text",
    required = true,
    placeholder = "",
    onChange
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required= {required}
        onChange={onChange}
     />
    </div>
  );
};

export default Input;
