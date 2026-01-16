export default function DataTable({ columns, data, actions }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-white bg-cyan-800">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 font-medium"
              >
                {col.label}
              </th>
            ))}
            {actions && <th className="px-4 py-3 text-center">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data?.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="px-4 py-6 text-center text-sm text-gray-500"
              >
                No records found
              </td>
            </tr>
          )}

          {data?.map((row, idx) => (
            <tr
              key={idx}
              className={`text-sm ${
                idx % 2 === 1 ? "bg-gray-100" : "bg-white"
              }`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4">
                  {col.render ? col.render(row) : row[col.key] ?? "-"}
                </td>
              ))}

              {actions && (
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {actions(row)}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}