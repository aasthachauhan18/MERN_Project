export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-gray-200 min-h-screen p-5">

      <h2 className="text-lg font-semibold mb-8">
        PrintFlow
      </h2>

      <div className="space-y-3">

        <div className="p-2 rounded hover:bg-gray-800 cursor-pointer">
          Dashboard
        </div>

        <div className="p-2 rounded hover:bg-gray-800 cursor-pointer">
          Quotes
        </div>

        <div className="p-2 rounded hover:bg-gray-800 cursor-pointer">
          Orders
        </div>

      </div>
    </div>
  );
}