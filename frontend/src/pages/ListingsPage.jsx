import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import FiltersSidebar from "../components/listings/FiltersSidebar";
import ListingCard from "../components/listings/ListingCard";
import { fetchListings, fetchLocalities } from "../api/listingsApi";

export default function ListingsPage() {
  const { citySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const paramsFromUrl = useMemo(() => {
    const obj = Object.fromEntries([...searchParams.entries()]);
    // convert numeric keys
    if (obj.skip) obj.skip = Number(obj.skip);
    if (obj.take) obj.take = Number(obj.take);
    if (obj.minBudget) obj.minBudget = Number(obj.minBudget);
    if (obj.maxBudget) obj.maxBudget = Number(obj.maxBudget);
    return obj;
  }, [searchParams]);

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
  useEffect(() => setFilters(initial), [citySlug, /* eslint-disable-line */ JSON.stringify(paramsFromUrl)]);

  // push filters to URL
  const pushUrl = (obj) => {
    const merged = { ...filters, ...obj };
    const qs = new URLSearchParams();
    Object.entries(merged).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
    });
    setSearchParams(qs);
    setFilters(merged);
  };

  const [listings, setListings] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // load localities
  useEffect(() => {
    fetchLocalities(filters.city || "")
      .then((res) => setLocalities(res.localities || []))
      .catch(() => setLocalities([]));
  }, [filters.city]);

  // load listings
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchListings(filters)
      .then((res) => {
        if (!mounted) return;
        setListings(res.listings || []);
        setTotalCount(res.totalCount || 0);
      })
      .catch((err) => {
        console.error(err);
        setListings([]);
        setTotalCount(0);
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [filters]); // when filters change, re-fetch

  const goPage = (page) => {
    const take = filters.take || 10;
    pushUrl({ skip: (page - 1) * take });
  };

  const currentPage = Math.floor((filters.skip || 0) / (filters.take || 10)) + 1;
  const totalPages = Math.ceil((totalCount || 0) / (filters.take || 10)) || 1;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[280px,1fr] gap-6">
        <FiltersSidebar filters={filters} setFilters={(f) => pushUrl(f)} localities={localities} />

        <main>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Listings{filters.city ? ` — ${filters.city}` : ""}</h1>
            <div className="text-sm text-gray-600">{totalCount} results</div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="p-6 bg-white rounded shadow text-center">Loading…</div>
            ) : listings.length === 0 ? (
              <div className="p-6 bg-white rounded shadow text-center">No listings found</div>
            ) : (
              listings.map((l) => <ListingCard key={String(l.id)} item={l} />)
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
