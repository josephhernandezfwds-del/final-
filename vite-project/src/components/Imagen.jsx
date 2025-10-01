import React, { useState } from "react";
import axios from "axios";

const UploadImage = () => {
    const [image, setImage] = useState(null);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "joseph");

        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dc0pcnlmc/image/upload",
            formData
        );

        setImage(res.data.secure_url);
        console.log(res.data.secure_url);
    };

    return (
        <div>
            <input type="file" onChange={handleUpload} />
            {image && <img src={image} alt="Uploaded" />}
        </div>
    );
};

export default UploadImage;