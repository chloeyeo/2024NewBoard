import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import CardItem from "../components/CardItem";

const MainPage = () => {
    const [products, setProducts] = useState([]);
    const limit = 4; // fixed value so no need to use useState
    const [skip, setSkip] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    const fetchProducts = async ({ skip, limit, loadMore = false }) => {
        const params = {
            skip,
            limit,
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
        };
        fetchProducts(body);
        setSkip(Number(skip) + Number(limit));
    }

    return (
        <section>
            <h2>글리스트</h2>

            {/* filter */}
            <div className="flex gap-3">
                <div className="w-1/2">checkbox</div>
                <div className="w-1/2">radio</div>
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
