import { useEffect, useState } from "react";
import { getLeads } from "../../api/adminApi";
import DataTable from "../../components/admin/tables/DataTable";

export default function Leads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    getLeads().then((res) => setLeads(res.data));
  }, []);

  const columns = [
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "event_date", label: "Event Date" },
  ];

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Leads</h1>
      <DataTable columns={columns} data={leads} />
    </>
  );
}
