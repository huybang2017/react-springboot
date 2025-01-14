import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";

const ImageUpload = ({ onChangeFormValues, formValues }) => {
    const [file, setFile] = useState(formValues.logo instanceof File ? formValues.logo : null);
    const [imageUrl, setImageUrl] = useState(null);

    const [fileType, setFileType] = useState();


    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);
            setFileType(file.name.split('.').pop());

            return () => URL.revokeObjectURL(url);
        } else {
            setImageUrl(null);
        }
    }, [file]);

    const handleFileChange = (event) => {
        const newFile = event.target.files[0];
        if (newFile) {
            setFile(newFile);
            onChangeFormValues({ ...formValues, logo: newFile });
        }
    };

    const handleRemove = () => {
        setFile(null);
        setImageUrl(null);
        onChangeFormValues({ ...formValues, logo: null });
    };

    return (
        <div className="relative mb-4">
            {imageUrl ? (
                <>
                    <div className="relative h-20 w-20">

                        {
                            fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png' ? (
                                <img
                                    src={imageUrl}
                                    alt="Uploaded"
                                    className="rounded-md w-[5rem] h-[5rem] object-cover"
                                />
                            ) : (
                                <img
                                    src={'https://png.pngtree.com/png-clipart/20230919/original/pngtree-comic-style-document-error-icon-on-white-background-vector-png-image_12431465.png'}
                                    alt="Uploaded"
                                    className="rounded-md w-[5rem] h-[5rem] object-cover"
                                />
                            )
                        }

                        <button
                            onClick={handleRemove}
                            className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                            type="button"
                        >
                            <IoMdClose className="h-4 w-4" />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <input
                        type="file"
                        onChange={handleFileChange}
                    />

                </>
            )}
        </div>
    );
};

export default ImageUpload;
