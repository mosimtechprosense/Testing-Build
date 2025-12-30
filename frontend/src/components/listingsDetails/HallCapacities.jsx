export default function HallCapacities({ hallCapacities = [] }) {
  if (!hallCapacities.length) return null;

  return (
    <section className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg mb-8">
      <h3 className="text-xl sm:text-2xl font-bold mb-5 text-red-600">
        Hall Capacities
      </h3>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-red-500 to-red-700 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Area</th>
              <th className="px-4 py-3 text-left">Capacity</th>
              <th className="px-4 py-3 text-left">Floating</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-center">
                Availability (Day | Night)
              </th>
            </tr>
          </thead>
          <tbody>
            {hallCapacities.map((hall, i) => {
              const day = hall.day_availability === "yes" ? "Yes" : "No";
              const night = hall.night_availability === "yes" ? "Yes" : "No";

              return (
                <tr
                  key={i}
                  className={i % 2 === 1 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{hall.area}</td>
                  <td className="px-4 py-3">{hall.capacity}</td>
                  <td className="px-4 py-3">{hall.floating}</td>
                  <td className="px-4 py-3 capitalize">{hall.type}</td>
                  <td className="px-4 py-3 text-center font-medium">
                    <span className={day === "Yes" ? "text-green-600" : "text-red-600"}>{day}</span>
                    <span className="inline-block mx-3 text-gray-400">|</span>
                    <span className={night === "Yes" ? "text-green-600" : "text-red-600"}>{night}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden flex flex-col gap-3">
        {hallCapacities.map((hall, i) => {
          const day = hall.day_availability === "yes" ? "Yes" : "No";
          const night = hall.night_availability === "yes" ? "Yes" : "No";

          return (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-4 flex flex-col gap-2"
            >
              <p className="font-bold text-red-600 text-lg">{hall.area}</p>

              <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                <span>
                  <strong>Capacity:</strong> {hall.capacity}
                </span>
                <span>
                  <strong>Floating:</strong> {hall.floating}
                </span>
                <span className="capitalize">
                  <strong>Type:</strong> {hall.type}
                </span>
              </div>

              <div className="text-sm text-gray-800 flex justify-start items-center gap-2">
                <strong>Availability:</strong>
                <span className={day === "Yes" ? "text-green-600" : "text-red-600"}>
                  {day}
                </span>
                <span className="text-gray-400">|</span>
                <span className={night === "Yes" ? "text-green-600" : "text-red-600"}>
                  {night}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
