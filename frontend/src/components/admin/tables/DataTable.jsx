// src/components/admin/tables/DataTable.jsx
export default function DataTable({ columns, data, actions }) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="p-3 text-left text-sm font-semibold">
                {col.label}
              </th>
            ))}
            {actions && <th className="p-3">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data?.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="p-4 text-center">
                No records found
              </td>
            </tr>
          )}

          {data?.map((row, idx) => (
            <tr key={idx} className="border-t">
              {columns.map((col) => (
                <td key={col.key} className="p-3 text-sm">
                  {row[col.key] ?? "-"}
                </td>
              ))}
              {actions && (
                <td className="p-3 space-x-2">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}