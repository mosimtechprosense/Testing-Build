import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import FiltersSidebar from "../components/FlitersSidebar/FiltersSidebar";
import ListingCard from "../components/listings/ListingCard";
import { fetchListings, fetchLocalities } from "../api/listingsApi";

export default function ListingsPage() {
  const { citySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse query params from URL
  const paramsFromUrl = useMemo(() => {
    const obj = Object.fromEntries([...searchParams.entries()]);
    ["skip", "take", "minBudget", "maxBudget", "vegetarian", "nonVegetarian"].forEach(key => {
      if (obj[key]) obj[key] = Number(obj[key]);
    });
    return obj;
  }, [searchParams]);

  // Initial filter state
  const initial = {
    city: citySlug ? decodeURIComponent(citySlug) : paramsFromUrl.city || undefined,
    search: paramsFromUrl.search || "",
    locality: paramsFromUrl.locality || undefined,
    minBudget: paramsFromUrl.minBudget || undefined,
    maxBudget: paramsFromUrl.maxBudget || undefined,
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

  // Update filters when URL changes
  useEffect(() => {
    setFilters({ ...initial });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citySlug, searchParams]);

  // Fetch localities
  useEffect(() => {
    fetchLocalities()
      .then(data => setLocalities(data.data || []))
      .catch(() => setLocalities([]));
  }, []);

  // Fetch listings whenever filters change
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    // Remove undefined/null/empty/NaN filters before sending
const cleanedFilters = Object.fromEntries(
  Object.entries(filters).filter(([key, value]) => {
    if (value === undefined || value === null || value === "") return false;
    if (["minBudget", "maxBudget", "skip", "take", "vegetarian", "nonVegetarian"].includes(key) && isNaN(Number(value))) return false;
    return true;
  })
);

// Normalize locality: convert hyphens to spaces and lowercase
if (cleanedFilters.locality) {
  cleanedFilters.locality = cleanedFilters.locality.replace(/-/g, " ").toLowerCase();
}



    fetchListings(cleanedFilters)
      .then(res => {
        if (!mounted) return;
        setListings(res.data || []);
        setTotalCount(res.total || 0);
      })
      .catch(err => {
        console.error(err);
        setListings([]);
        setTotalCount(0);
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [filters]);

  // Push filters to URL
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
    Object.entries(cleaned).forEach(([k, v]) => qs.set(k, String(v).replace(/-/g, " "))); // Locality hyphen fix

    setSearchParams(qs);
    setFilters(cleaned);
  };

  // Pagination helpers
  const currentPage = Math.floor((filters.skip || 0) / (filters.take || 10)) + 1;
  const totalPages = Math.ceil((totalCount || 0) / (filters.take || 10)) || 1;

  const goPage = (pageNumber) => {
    const newSkip = (pageNumber - 1) * (filters.take || 10);
    pushUrl({ skip: newSkip });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[280px,1fr] gap-6">
        <FiltersSidebar filters={filters} setFilters={pushUrl} localities={localities} />

        <main>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">
              Listings{filters.city ? ` — ${filters.city}` : ""}
            </h1>
            <div className="text-sm text-gray-600">{totalCount} results</div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="p-6 bg-white rounded shadow text-center">Loading…</div>
            ) : listings.length === 0 ? (
              <div className="p-6 bg-white rounded shadow text-center">No listings found</div>
            ) : (
              listings.map(l => <ListingCard key={String(l.id)} item={l} />)
            )}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              className="px-3 py-2 border rounded"
              onClick={() => goPage(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
            >
              Prev
            </button>

            <div className="text-gray-600">
              Page {currentPage} of {totalPages}
            </div>

            <button
              className="px-3 py-2 border rounded"
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
