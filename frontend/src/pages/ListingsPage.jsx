import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import FiltersSidebar from "../components/FlitersSidebar/FiltersSidebar"
import ListingCard from "../components/listings/ListingCard";
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
    take: paramsFromUrl.take || 10,
  };

  const [filters, setFilters] = useState(initial);
  const [listings, setListings] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile toggle

  useEffect(() => {
    setFilters({ ...initial });
  }, [citySlug, searchParams]);

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
    const merged = { ...filters, ...obj };
    const cleaned = Object.fromEntries(
      Object.entries(merged).filter(([k, v]) => {
        if (v === undefined || v === null || v === "") return false;
        if (["minBudget", "maxBudget", "skip", "take", "vegetarian", "nonVegetarian"].includes(k) && isNaN(Number(v))) return false;
        return true;
      })
    );

    const qs = new URLSearchParams();
    Object.entries(cleaned).forEach(([k, v]) => qs.set(k, String(v).replace(/-/g, " ")));
    setSearchParams(qs);
    setFilters(cleaned);
  };

  const currentPage = Math.floor((filters.skip || 0) / (filters.take || 10)) + 1;
  const totalPages = Math.ceil((totalCount || 0) / (filters.take || 10)) || 1;

  const goPage = (pageNumber) => {
    const newSkip = (pageNumber - 1) * (filters.take || 10);
    pushUrl({ skip: newSkip });
  };

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

    {/* Pagination */}
    <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-2">
      <button
        className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer"
        onClick={() => goPage(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
      >
        Prev
      </button>

      <div className="text-gray-600">
        Page {currentPage} of {totalPages}
      </div>

      <button
        className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer"
        onClick={() => goPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  </main>
</div>
    </div>
  );
}