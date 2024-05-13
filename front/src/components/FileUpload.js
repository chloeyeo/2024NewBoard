import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";

const FileUpload = ({ images, onImageChange }) => {
    async function handleDrop(files) {
        console.log(files);
        let formData = new FormData();
        formData.append("image", files[0]); // upload.single("image") in backend productRouter
        console.log(files[0]);

        const config = {
            header: { "content-type": "multipart/form-data" },
        };

        try {
            const res = await axiosInstance.post(
                "/products/image",
                formData,
                config
            );
            console.log(res.data);
            onImageChange([...images, res.data]);
            // alert("upload ok");
        } catch (error) {
            console.error(error);
        }
    }

    function handleDelete(image) {
        const currentIndex = images.indexOf(image);
        let newImages = [...images];
        newImages.splice(currentIndex, 1);
        onImageChange(newImages);
    }

    return (
        <div>
            <h2>file</h2>
            <div>
                <Dropzone onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                        // <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p className="border border-dotted rounded-md py-4 px-4 my-4 bg-slate-100 flex justify-center">
                                Drag 'n' drop some files here, or click to
                                select files
                            </p>
                        </div>
                        // </section>
                    )}
                </Dropzone>
            </div>
            <div className="flex gap-3 mb-4">
                {images.map((image) => {
                    return (
                        <div
                            key={image}
                            className="w-[100px] flex justify-end relative"
                        >
                            <div
                                onClick={() => {
                                    handleDelete(image);
                                }}
                                className="flex justify-center items-center bg-red-300 w-[15px] h-[20px] absolute"
                            >
                                x
                            </div>
                            <img
                                src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${image}`}
                                alt="uploaded img"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FileUpload;
