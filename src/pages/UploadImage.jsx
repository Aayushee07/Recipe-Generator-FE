import React, { useState } from 'react';
import CustomWebcam from './CustomWebCam.jsx';

const UploadImage = () => {
  const [uploadImage, setUploadImage] = useState(false); // Toggle between manual input and camera
  const [capturedImage, setCapturedImage] = useState(null); // Store the captured image

  // State variables for recipe details
  const [ingredients, setIngredients] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [dietType, setDietType] = useState('');

  const handleToggleChange = () => {
    setUploadImage(!uploadImage); // Toggle the image upload state
    setCapturedImage(null); // Reset captured image when toggling
  };

  const handleCapture = (image) => {
    setCapturedImage(image); // Set the captured image from the webcam
  };

  const handleSubmit = () => {
    console.log('Ingredients:', ingredients);
    console.log('Serving Size:', servingSize);
    console.log('Diet Type:', dietType);
    // Additional form submission logic can be added here
  };

  return (
    <div className="mt-8 w-full max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Ingredients to Recipe</h1>

      {/* Toggle Switch */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-lg mr-4">Do you want to give manual input?</span>
        <label className="switch">
          <input type="checkbox" checked={uploadImage} onChange={handleToggleChange} />
          <span className="slider round"></span>
        </label>
      </div>

      {/* Conditional Rendering: Image Upload Section */}
      {!uploadImage ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload or Capture Image</h2>
          <p className="text-gray-600 mb-4">Upload from your gallery or use the camera to capture an image.</p>

          {capturedImage ? (
            <div className="captured-image-container">
              <img src={capturedImage} alt="Captured" className="captured-image" />
            </div>
          ) : (
            <CustomWebcam onCapture={handleCapture} />
          )}

          <div className="text-center text-gray-500 my-4">or</div>

          {/* Optionally Upload from Gallery */}
          <div className="flex flex-col items-center mt-8">
            <input
              type="file"
              accept="image/*"
              className="mb-4 p-2 border border-gray-300 rounded-lg"
              onChange={(e) => setCapturedImage(URL.createObjectURL(e.target.files[0]))}
            />
            <p className="text-sm text-gray-500">Supports: .jpg, .jpeg, .png</p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full mt-8 p-2 bg-pink-800 text-white rounded-lg hover:bg-pink-600"
          >
            Submit
          </button>
        </div>
      ) : (
        /* Manual Input Form Section */
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recipe Details</h2>

          {/* Ingredients Input */}
          <div className="mb-4 mt-8">
            <label htmlFor="ingredients" className="block text-gray-700 font-semibold mb-2">
              What ingredients do you have?
            </label>
            <input
              type="text"
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="E.g., Tomatoes, Chicken, Rice"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Serving Size Input */}
          <div className="mb-4">
            <label htmlFor="serving-size" className="block text-gray-700 font-semibold mb-2">
              Serving Size
            </label>
            <input
              type="number"
              id="serving-size"
              value={servingSize}
              onChange={(e) => setServingSize(e.target.value)}
              placeholder="Enter serving size"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Diet Type Input */}
          <div className="mb-4">
            <label htmlFor="diet" className="block text-gray-700 font-semibold mb-2">
              Diet Type
            </label>
            <select
              id="diet"
              value={dietType}
              onChange={(e) => setDietType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select diet type</option>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="keto">Keto</option>
              <option value="paleo">Paleo</option>
              <option value="gluten-free">Gluten-Free</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full mt-8 p-2 bg-pink-800 text-white rounded-lg hover:bg-pink-600"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
