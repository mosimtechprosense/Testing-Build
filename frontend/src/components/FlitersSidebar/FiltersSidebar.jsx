import SearchFilter from "./SearchFilter";
import LocationFilter from "./LocationFilter";
import PriceRange from "./PriceRange";
import GuestRange from "./GuestRange";
import VenueTypeFilter from "./VenueTypeFilter";
import MealTypeFilter from "./MealTypeFilter";
import TagsFilter from "./TagsFilter";
import SortFilter from "./SortFilter";

export default function FiltersSidebar({ filters, setFilters }) {
  return (
    <aside className="bg-white p-4 rounded-lg shadow w-full md:w-72 select-none">
      
      <SearchFilter search={filters.search} setFilters={setFilters} />
      <hr className="my-4" />

      <LocationFilter setFilters={setFilters} />
      <hr className="my-4" />

      <PriceRange
        value={[filters.minBudget, filters.maxBudget]}
        onChange={([minBudget, maxBudget]) =>
          setFilters({ minBudget, maxBudget, skip: 0 })
        }
      />
      <hr className="my-4" />

      <GuestRange
        value={[filters.minGuests || 0, filters.maxGuests || 1200]}
        onChange={([minGuests, maxGuests]) =>
          setFilters({ minGuests, maxGuests, skip: 0 })
        }
      />
      <hr className="my-4" />

      <VenueTypeFilter setFilters={setFilters} />
      <hr className="my-4" />

      <MealTypeFilter filters={filters} setFilters={setFilters} />
      <hr className="my-4" />

      <TagsFilter filters={filters} setFilters={setFilters} />
      <hr className="my-4" />

      <SortFilter filters={filters} setFilters={setFilters} />
    </aside>
  );
}