const Button = ({ children, loading, ...props }) => {
  return (
    <button
      type="submit"  
      {...props}
      className="w-full bg-indigo-600 text-white p-2 rounded"
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;