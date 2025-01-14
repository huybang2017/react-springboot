import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";

const ImageUpload = ({ onChangeFormValues, formValues }) => {
   
    const [file, setFile] = useState(formValues.banner instanceof File ? formValues.banner : null);
    const [imageUrl, setImageUrl] = useState(null);
    const [fileType, setFileType] = useState('');

    useEffect(() => {
       
        if (file) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);

           
            return () => URL.revokeObjectURL(url);
        } else {
            setImageUrl(null);
        }
    }, [file]);

    const handleFileChange = (event) => {
        const newFile = event.target.files[0];
        if (newFile) {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
            if (validImageTypes.includes(newFile.type)) {
                setFileType(newFile.type.split('/').pop());
                setFile(newFile);
                onChangeFormValues({...formValues, banner: newFile});
            }else{
                setFileType('invalid');
                setFile(null);
                onChangeFormValues({...formValues, banner: null});
            }
        }
    };

    const handleRemove = () => {
        setFile(null);
        setImageUrl(null);
        onChangeFormValues({...formValues, banner: null});
    };

    return (
        <div className="relative h-20 w-20">
            {imageUrl ? (
                <>
                    <img
                        src={imageUrl}
                        alt="Uploaded"
                        className="rounded-md w-[5rem] h-[5rem] object-cover"
                    />
                    <button
                        onClick={handleRemove}
                        className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                        type="button"
                    >
                        <IoMdClose className="h-4 w-4"/>
                    </button>
                </>
            ) : (
                <input
                    type="file"
                    onChange={handleFileChange}
                />
            )}
        </div>
    );
};

export default ImageUpload;
