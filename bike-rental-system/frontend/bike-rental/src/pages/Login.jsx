function Login() {
  return (
    <div className="card p-4">

      <h3>Login</h3>

      <input className="form-control mb-2" placeholder="Email" />
      <input className="form-control mb-3" placeholder="Password" />

      <button className="btn btn-primary">
        Login
      </button>

    </div>
  );
}

export default Login;