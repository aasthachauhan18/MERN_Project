const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500">
      
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;