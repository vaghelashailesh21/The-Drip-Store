import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };
  return (
    <div className=" flex items-center mt-2 justify-end mb-2">
      <select
        id="sort"
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || ""}
        className="border p-2 w-full lg:w-auto  rounded-md focus:outline-none"
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to high</option>
        <option value="priceDesc">Price: High to high</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;
