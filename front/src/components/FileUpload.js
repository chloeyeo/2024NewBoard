import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";

const FileUpload = ({ images, onImageChange }) => {
    return (
        <div>
            <h2>file</h2>
            <div>
                <Dropzone
                    onDrop={(acceptedFiles) => console.log(acceptedFiles)}
                >
                    {({ getRootProps, getInputProps }) => (
                        // <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p className="border border-dotted py-4 px-4 my-4 bg-slate-100 flex justify-center">
                                + Drag 'n' drop some files here, or click to
                                select files
                            </p>
                        </div>
                        // </section>
                    )}
                </Dropzone>
            </div>
        </div>
    );
};

export default FileUpload;
