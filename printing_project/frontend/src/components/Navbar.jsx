export default function Navbar({ logout }) {
  return (
    <div className="glass flex justify-between items-center px-6 py-4 m-4 rounded-xl">

      <h1 className="text-xl font-semibold">
        Dashboard
      </h1>

      <div className="flex gap-3">

        <button className="btn" onClick={logout}>
          Logout
        </button>

      </div>

    </div>
  );
}