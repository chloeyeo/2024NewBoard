import { useState } from "react";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
const continents = [
    { key: 1, value: "Seoul" },
    { key: 2, value: "Busan" },
    { key: 3, value: "Suwon" },
    { key: 4, value: "Daegu" },
    { key: 5, value: "Incheon" },
    { key: 6, value: "Jeju" },
];

const PostWrite = () => {
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: 0,
        continents: 1,
        images: [],
    });

    const navigate = useNavigate();

    function handleChange(event) {
        // event.target.value;
        // event.target.name;
        const { value, name } = event.target;
        console.log(value, name);
        setProduct((prevState) => {
            return { ...prevState, [name]: value };
        });
    }
    async function handleSubmit(event) {
        event.preventDefault(); // prevents default reload page
        const body = { ...product };
        if (body.title === "" || body.description === "") {
            return alert("must have both title and description");
        }
        try {
            await axiosInstance.post("/products", body);
            navigate("/");
            alert("post save successful");
        } catch (error) {
            console.error(error);
        }
    }

    function handleImage(newImages) {
        setProduct((prevState) => ({ ...prevState, images: newImages }));
    }

    return (
        <section>
            <h2 className="mt-4 mb-4">Write a Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    {/* label is an inline tab so mb does not work unless you put block = display block in tailwind */}
                    <label htmlFor="title" className="mb-3 block">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={product.title}
                    />
                </div>
                <div className="mb-4">
                    {/* htmlFor of label matches id of input element
                    set value for immediate change of value as product.description changes */}
                    <label htmlFor="description" className="mb-3 block">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={product.description}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="mb-3 block">
                        Price
                    </label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={product.price}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="continents" className="mb-3 block">
                        Region
                    </label>
                    <select
                        name="continents"
                        id="continents"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={product.continents}
                    >
                        {continents.map((continent) => {
                            return (
                                <option
                                    value={continent.key}
                                    key={`continent-${continent.key}`}
                                >
                                    {continent.value}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <FileUpload
                    images={product.images}
                    onImageChange={handleImage}
                />

                <div>
                    <button className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
                        Finish writing the post
                    </button>
                </div>
            </form>
        </section>
    );
};

export default PostWrite;
