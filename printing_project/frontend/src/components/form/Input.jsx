const Input = ({ label, type = "text", error, ...props }) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>

      <input
        type={type}
        {...props}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 transition outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;