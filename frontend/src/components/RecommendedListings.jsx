import { useEffect, useState } from "react";
import axios from "axios";
import { HiUserGroup } from "react-icons/hi2";


const RecommendedListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5173";

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(`${API_BASE}/listings/recommended`);
        setListings(res.data.data || []);
      } catch (error) {
        console.error("Error fetching recommended listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-xl font-semibold text-gray-600">
        Loading recommended listings...
      </div>
    );
  }

  return (
    <section className="py-10">
      {/* Section Header */}
      <div className="flex justify-between items-center px-4 md:px-8 mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          Recommended Banquet Halls
        </h2>

        <button className="text-sm font-semibold text-red-600 hover:text-red-700">
          View All →
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-8">
        {listings.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            {/* Image */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={item.images?.[0] || "/placeholder.jpg"}
                alt={item.title}
                className="h-full w-full object-cover group-hover:scale-110 transition-all duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {item.excerpt}
              </p>

              {/* Guests & Price */}
              <div className="mt-3 flex justify-between text-sm font-medium text-gray-800">
                <span><HiUserGroup /> {item.capacityFrom}-{item.capacityTo} guests</span>
                <span>₹{item.pricePerPlate}/plate</span>
              </div>

              {/* Button */}
              <button className="mt-4 w-full bg-red-600 text-white
               py-2 rounded-lg hover:bg-red-700 transition-all">
                View Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedListings;
