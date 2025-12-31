import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import FiltersSidebar from "../components/FlitersSidebar/FiltersSidebar"
import ListingCard from "../components/ListingCards/ListingCard";
import { fetchListings, fetchLocalities } from "../api/listingsApi";

export default function ListingsPage() {

  const { citySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const paramsFromUrl = useMemo(() => {
    const obj = Object.fromEntries([...searchParams.entries()]);
    ["skip", "take", "minBudget", "maxBudget", "vegetarian", "nonVegetarian"].forEach(key => {
      if (obj[key]) obj[key] = Number(obj[key]);
    });
    return obj;
  }, [searchParams]);

  const initial = {
    city: citySlug ? decodeURIComponent(citySlug) : paramsFromUrl.city || undefined,
    search: paramsFromUrl.search || "",
    locality: paramsFromUrl.locality || undefined,
    venueType: paramsFromUrl.venueType || undefined,
    minBudget: paramsFromUrl.minBudget || undefined,
    maxBudget: paramsFromUrl.maxBudget || undefined,
    minGuests: paramsFromUrl.minGuests !== undefined ? Number(paramsFromUrl.minGuests) : undefined,
    maxGuests: paramsFromUrl.maxGuests !== undefined ? Number(paramsFromUrl.maxGuests) : undefined,
    vegetarian: paramsFromUrl.vegetarian || undefined,
    nonVegetarian: paramsFromUrl.nonVegetarian || undefined,
    sortBy: paramsFromUrl.sortBy || "created_at",
    order: paramsFromUrl.order || "desc",


    skip: paramsFromUrl.skip || 0,
    take: 10,
  };

const goPage = (pageNumber) => {
  const newSkip = (pageNumber - 1) * 10;
  pushUrl({ skip: newSkip });
};


  
  const [filters, setFilters] = useState(initial);
  const [listings, setListings] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const showingFrom = totalCount === 0 ? 0 : filters.skip + 1;
  const showingTo = Math.min(filters.skip + filters.take, totalCount);


  useEffect(() => {
  if (filters.skip === undefined) return;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [filters.skip]);


  useEffect(() => { 
    fetchLocalities()
      .then(data => setLocalities(data.data || []))
      .catch(() => setLocalities([]));
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => {
        if (value === undefined || value === null || value === "") return false;
        if (["minBudget", "maxBudget", "skip", "take", "vegetarian", "nonVegetarian"].includes(key) && isNaN(Number(value))) return false;
        return true;
      })
    );

    if (cleanedFilters.minGuests == null) {
  delete cleanedFilters.minGuests
}

if (cleanedFilters.maxGuests == null) {
  delete cleanedFilters.maxGuests
}

    if (
  cleanedFilters.search &&
  ["banquet hall", "banquet halls"].includes(
    cleanedFilters.search.toLowerCase().trim()
  )
) {
  delete cleanedFilters.search;
}

if (cleanedFilters.locality) {
  // numeric locality (ID) from sidebar → ignore
  if (typeof cleanedFilters.locality === "number") {
    delete cleanedFilters.locality;
  }

  // string locality (home page or URL)
  else if (typeof cleanedFilters.locality === "string") {
    cleanedFilters.locality = cleanedFilters.locality
      .replace(/-/g, " ")
      .toLowerCase();
  }

  // object locality (dropdown option)
  else if (typeof cleanedFilters.locality === "object") {
    cleanedFilters.locality =
      cleanedFilters.locality.slug ||
      cleanedFilters.locality.value ||
      cleanedFilters.locality.name;

    cleanedFilters.locality = cleanedFilters.locality
      ?.replace(/-/g, " ")
      .toLowerCase();
  }
}


    fetchListings(cleanedFilters)
      .then(res => {
        if (!mounted) return;
        setListings(res.data || []);
        setTotalCount(res.total || 0);
      })
      .catch(() => {
        setListings([]);
        setTotalCount(0);
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [filters]);
  

const pushUrl = (obj) => {
  const merged = { ...filters, ...obj, take: 10 };

  const cleaned = Object.fromEntries(
    Object.entries(merged).filter(([k, v]) => {
      if (v === undefined || v === null || v === "") return false;
      if (
        ["minBudget", "maxBudget", "skip", "vegetarian", "nonVegetarian"].includes(k) &&
        isNaN(Number(v))
      )
        return false;
      return true;
    })
  );

  cleaned.take = 10;

  const qs = new URLSearchParams();
  Object.entries(cleaned).forEach(([k, v]) =>
    qs.set(k, String(v))
  );

  setSearchParams(qs, { replace: false, preventScrollReset: true });
  setFilters(cleaned);
};


  const currentPage = Math.floor((filters.skip || 0) / (filters.take || 10)) + 1;
  const totalPages = Math.ceil((totalCount || 0) / (filters.take || 10)) || 1;



  return (
    <div className="min-h bg-gray-50 p-4 md:p-6">

<div className="max-w-7xl mx-auto md:flex md:space-x-6 gap-6">
  
  {/* Sidebar */}
  <aside
    className={`
      p-0 md:block
      ${sidebarOpen ? "block" : "hidden"} md:relative
      md:w-72 flex-shrink-0
    `}
  >
    <FiltersSidebar filters={filters} setFilters={pushUrl} localities={localities} />
  </aside>

  {/* Listings container */}
  <main className="flex-1 space">

     {/* SCROLL TARGET */}

    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
      <h1 className="text-2xl font-bold">
        Listings{filters.city ? ` — ${filters.city}` : ""}
      </h1>
      <div className="text-sm text-gray-600">{totalCount} results</div>
    </div>

    {loading ? (
      <div className="p-6 bg-white rounded shadow text-center">Loading…</div>
    ) : listings.length === 0 ? (
      <div className="p-6 bg-white rounded shadow text-center">
        No listings found
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-4">
        {listings.map((l) => (
          <ListingCard key={String(l.id)} item={l} />
        ))}
      </div>
    )}

{/* PAGINATION */}
{totalPages > 1 && (
  <div className="mt-10 space-y-4">
    <p className="text-sm text-gray-500 text-center">
      Showing {showingFrom} to {showingTo} of {totalCount} results
    </p>

    <div className="flex justify-center gap-2 flex-wrap">
      {/* Prev */}
      <button
        onClick={() => goPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-15 h-10 flex items-center justify-center rounded-lg border cursor-pointer
          text-gray-400 border-gray-300 hover:bg-gray-100 disabled:opacity-50"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1;
        const isActive = p === currentPage;

        return (
          <button
            key={p}
            onClick={() => goPage(p)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg border transition cursor-pointer
              ${
                isActive
                  ? "bg-red-600 text-white border-red-600"
                  : "text-red-600 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {p}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => goPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-15 h-10 flex items-center justify-center rounded-lg border cursor-pointer
          text-gray-400 border-gray-300 hover:bg-gray-100 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
)}

  </main>
</div>
    </div>
  );
}