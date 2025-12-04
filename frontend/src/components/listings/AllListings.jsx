import { useEffect, useState } from "react";
import ListingCard from "../../components/listings/ListingCard";
import Filters from "../../components/listings/Filters";
import Pagination from "../../components/listings/Pagination";
import { fetchListings } from "../../services/listings.service";

export default function AllListings() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    loadData();
  }, [filters, page]);

  const loadData = async () => {
    const res = await fetchListings({ ...filters, skip: (page - 1) * limit, take: limit });
    setData(res.listings);
    setTotal(res.totalCount);
  };

  const updateFilter = (name, value) => {
    setFilters({ ...filters, [name]: value });
    setPage(1);
  };

  return (
    <div className="flex gap-6 container mx-auto py-10">
      <Filters filters={filters} onFilter={updateFilter} />

      <div className="grid grid-cols-3 gap-6 flex-1">
        {data.map((item) => (
          <ListingCard key={item.id} item={item} />
        ))}
      </div>

      <Pagination
        page={page}
        total={total}
        limit={limit}
        onPageChange={setPage}
      />
    </div>
  );
}
