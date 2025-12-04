import Badge from "./Badge";

export default function ListingCard({ item }) {
  const img = item?.venue_images?.[0]?.image_url || "/placeholder.jpg";

  return (
    <article className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 h-48 md:h-auto">
        <img src={img} alt={item.title} className="w-full h-full object-cover" />
      </div>

      <div className="p-4 flex-1">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-lg font-semibold truncate">{item.title}</h3>
          <div className="text-pink-600 font-semibold">
            {item.min_budget ? `₹${item.min_budget}` : "Price on Request"}
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-2 line-clamp-3">{item.excerpt}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge>{item.city}</Badge>
          <Badge>{item.locality}</Badge>
          <Badge>{item.min_guest}-{item.max_guest} pax</Badge>
        </div>

        <div className="mt-4 flex">
          <button className="ml-auto bg-pink-600 text-white px-4 py-2 rounded-lg">
            Send Message
          </button>
        </div>
      </div>
    </article>
  );
}
