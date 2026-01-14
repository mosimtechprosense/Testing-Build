// src/admin/Users.jsx
import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  deleteUser,
} from "../../api/adminApi";
import DataTable from "../../components/admin/tables/DataTable";

export default function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const removeUser = async (id) => {
    if (confirm("Delete user?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "is_active", label: "Active" },
  ];

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Users</h1>

      <DataTable
        columns={columns}
        data={users}
        actions={(row) => (
          <button
            className="text-red-600"
            onClick={() => removeUser(row.id)}
          >
            Delete
          </button>
        )}
      />
    </>
  );
}
