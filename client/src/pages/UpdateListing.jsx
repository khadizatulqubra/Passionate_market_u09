
import { useEffect, useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate, useParams } from 'react-router-dom';
import {useSelector} from 'react-redux'



export default function CreateListing() {
  const {currentUser} = useSelector((state )=> state.user);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    imageUrls: [],
    //  userRef:"",
    productName: "",
    description: "",
    address: "",
    category: "",
    // type: "sale",
    color: "#ff0088",
    offer:false,
    pieces: 0,
    regularPrice: 5,
    discountPrice: 5,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error,setError]= useState (false);
  const [loading, setLoading]= useState(false)
  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);
  
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];
      setUploading(true);
      setImageUploadError(false);
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("image upload failed ");
          setUploading(false);
        });
    } else {
      setImageUploadError("you can upload up to 6 images");
      setUploading(false);
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Uploading ${progress}%`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {

  /*   if (e.target.id === "sale") {
      setFormData({
        ...formData,
        type: e.target.checked ? "sale" : "",
      
      });
    
    } */
    
   if (
    e.target.type==='number'|| 
    e.target.type==='text'||
    e.target.type==='textarea')
    {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    
   }
    
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    }); 
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
  
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id, // Include userRef in the formData object
        }),
      });
  
      const data = await res.json();
      setLoading(false);
  
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  

  return (
    <main className="max-w-4xl p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Update Listing</h1>

      <form  onSubmit={ handleSubmit}  className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col flex-1 gap-4">
         
          <input
            type="text"
            placeholder=" Productname"
            className="p-3 border rounded-lg"
            id="productName"
            maxLength="62"
            minLength="5"
            required
            onChange={handleChange}
            value={formData.productName}
          />
          <textarea
            type="text"
            placeholder=" Description"
            className="p-3 border rounded-lg"
            id="description"
            maxLength="100"
            minLength="5"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder=" Address"
            className="p-3 border rounded-lg"
            id="address"
            maxLength="62"
            minLength="5"
            required
            onChange={handleChange}
            value={formData.address}
          />

<input
              type="text"
              placeholder="Category"
              className="p-3 border rounded-lg"
              id="category"
              required
              onChange={handleChange}
              value={formData.category}
            />
         

          <div className="flex flex-wrap gap-4">

            <div className="flex gap-2">
              <input
                type="color"
                id="color"
                name="product color"
                value={formData.color}
                onChange={handleChange}
              />
              <span>Color</span>
            </div>

          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="pieces"
                min="1"
                max="100"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.pieces}
              />
              <p>Product quantity</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="5"
                max="10000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs ">($/month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="5"
                max="10000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.discountPrice}
              />
              <div className="flex flex-col items-center">
                <p>Discount Price</p>
                <span className="text-xs ">($/month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            {" "}
            images:
            <span className="ml-2 font-normal text-pink-700">
              {" "}
              The first image will be the cover image (max 6)
            </span>
          </p>

          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="w-full p-3 border border-gray-300 rounded"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 uppercase border border-green-700 rounded hover:shadow-lg disabled:opacity-80"
            >
              {" "}
              {uploading ? "uploading..." : "upload"}
            </button>
          </div>
          <p className="text-red-700">
            {" "}
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex items-center justify-between p-3 border"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="object-contain w-20 h-20 rounded-lg "
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg hover:opacity-90 disabled:opacity-80"
                >
                  Delete
                </button>
              </div>
            ))}

          <button className="p-3 text-white uppercase bg-pink-900 rounded-lg hover:opacity-90 disabled:opacity-60"  disabled={loading || uploading}>
          
        { 
        loading ? 'creating...' : 'Update Listing'}
          </button>
          <p className="text-red-700">
            {" "}
            {error && error}
          </p>
        </div>
      </form>
    </main>
  );
}
