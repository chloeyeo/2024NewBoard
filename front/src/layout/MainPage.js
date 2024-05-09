import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import CardItem from "../components/CardItem";
import { continents, prices } from "../utils/filterData";
import CheckBox from "../components/CheckBox";

const MainPage = () => {
    const [products, setProducts] = useState([]);
    const limit = 4; // fixed value so no need to use useState
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [filters, setFilters] = useState({
        continents: [1, 2], // checkbox - multiple
        price: [], // radio button - single
    });

    const fetchProducts = async ({
        skip,
        limit,
        loadMore = false,
        filters = {},
    }) => {
        const params = {
            skip,
            limit,
            filters,
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
        };
        fetchProducts(body);
        setSkip(Number(skip) + Number(limit));
    }

    function handleFilters(newFilters) {
        const filteredData = { ...filters };
        filteredData["continents"] = newFilters;
        showFilterResult(filteredData);
        setFilters(filteredData);
    }

    function showFilterResult(filters) {
        console.log("filters", filters);
        const body = {
            skip: 0,
            limit,
            loadMore: false,
            filters,
        };
        fetchProducts(body);
        setSkip(0);
    }

    return (
        <section>
            <h2 className="py-4">List of Posts</h2>

            {/* filter */}
            <div className="flex gap-3">
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
                                handleFilters(filters);
                            }}
                        />
                    </div>
                </div>
                {/* <div className="w-1/2">radio</div> */}
            </div>

            {/* search */}
            <div className="flex justify-end mb-3">search</div>

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
