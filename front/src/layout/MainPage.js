import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import CardItem from "../components/CardItem";
import { continents, prices } from "../utils/filterData";
import CheckBox from "../components/CheckBox";
import RadioBox from "../components/RadioBox";
import SearchInput from "../components/SearchInput";

const MainPage = () => {
    const [products, setProducts] = useState([]);
    const limit = 4; // fixed value so no need to use useState
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [filters, setFilters] = useState({
        continents: [], // checkbox - multiple
        price: [], // radio button - single
    });
    const [searchForm, setSearchForm] = useState("");

    const fetchProducts = async ({
        skip,
        limit,
        loadMore = false,
        filters = {},
        searchForm = "",
    }) => {
        const params = {
            skip,
            limit,
            filters,
            searchForm,
        };
        try {
            const res = await axiosInstance.get("/products", { params }); // query string /products?skip=0&limit=4 for instance
            console.log(res.data);
            if (loadMore) {
                setProducts([...products, ...res.data.products]);
            } else {
                setProducts(res.data.products);
            }
            setHasMore(res.data.hasMore);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts({ skip, limit });
    }, []);

    function handleLoadMore() {
        const body = {
            skip: skip + limit,
            limit,
            loadMore: true,
            filters,
            searchForm,
        };
        fetchProducts(body);
        setSkip(Number(skip) + Number(limit));
    }

    function handleFilters(newFilters, category) {
        const filteredData = { ...filters };
        // filteredData["continents"] = newFilters;
        filteredData[category] = newFilters;

        if (category === "price") {
            const priceValues = handlePrice(newFilters); // newFilters=3 for instance
            filteredData[category] = priceValues; // priceValues=array:[0,100] for instance
        }

        showFilterResult(filteredData);
        setFilters(filteredData);
    }

    function handlePrice(value) {
        // returns back array[100,250]  for instance
        let array = [];
        for (let key in prices) {
            // key = _id, name, array
            // key is NOT an index but a KEY since prices is an OBJECT {}
            if (prices[key]._id === parseInt(value, 10)) {
                array = prices[key].array;
            }
        }
        return array;
    }

    function showFilterResult(filters) {
        console.log("filters", filters);
        const body = {
            skip: 0,
            limit,
            loadMore: false,
            filters,
            searchForm,
        };
        fetchProducts(body);
        setSkip(0);
    }

    function handleSearch(event) {
        const body = {
            skip: 0,
            limit,
            filters,
            searchForm: event.target.value,
        };
        fetchProducts(body);
        setSkip(0);
        setSearchForm(event.target.value);
    }

    return (
        <section>
            <h2 className="py-4">List of Posts</h2>

            {/* filter */}
            <div className="flex gap-3 mb-4">
                <div className="w-full px-2">
                    <h3 className="mb-2">Choose a Region:</h3>
                    {/* <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 mb-3">
                        <div className="w-[100%] bg-slate-200 text-center">
                            text
                        </div>
                        <div className="w-[100%] bg-slate-200 text-center">
                            text
                        </div>
                        <div className="w-[100%] bg-slate-200 text-center">
                            text
                        </div>
                        <div className="w-[100%] bg-slate-200 text-center">
                            text
                        </div>
                        <div className="w-[100%] bg-slate-200 text-center">
                            text
                        </div>
                        <div className="w-[100%] bg-slate-200 text-center">
                            text
                        </div>
                        <div className="w-[100%] bg-slate-200 text-center">
                            text
                        </div>
                        <div className="w-[100%] bg-slate-200 text-center">
                            text
                        </div>
                        <div className="w-[100%] bg-slate-200 text-center">
                            text
                        </div>
                    </div> */}
                    <div>
                        <CheckBox
                            continents={continents}
                            checkedContinents={filters.continents}
                            onFilters={(filters) => {
                                handleFilters(filters, "continents");
                            }}
                        />
                    </div>
                    <div>
                        <RadioBox
                            prices={prices}
                            checkedPrice={filters.price}
                            onFilters={(filters) => {
                                handleFilters(filters, "price");
                            }}
                        />
                    </div>
                </div>
                {/* <div className="w-1/2">radio</div> */}
            </div>

            {/* search */}
            <div className="flex justify-end mb-3">
                <SearchInput searchForm={searchForm} onSearch={handleSearch} />
            </div>

            {/* products */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-3">
                {products &&
                    products.map((product) => {
                        return (
                            <CardItem
                                product={product}
                                key={`product-${product._id}`}
                            />
                        );
                    })}
            </div>

            {/* see more */}
            {hasMore && (
                <div className="flex justify-center">
                    <button
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-400"
                        onClick={handleLoadMore}
                    >
                        See More
                    </button>
                </div>
            )}
        </section>
    );
};

export default MainPage;
