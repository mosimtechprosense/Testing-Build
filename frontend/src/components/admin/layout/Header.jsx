import { useAdminAuth } from "../../../store/AdminAuthContext";

export default function Header() {
  const { logout } = useAdminAuth();

  return (
    <header className="bg-white shadow p-4 flex justify-end">
      <button
        onClick={logout}
        className="text-red-500 font-semibold"
      >
        Logout
      </button>
    </header>
  );
}
