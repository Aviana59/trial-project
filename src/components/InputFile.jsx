/* eslint-disable react/prop-types */

import { useState } from 'react';

const DragDropImageUploader = ({ onImagesChange }) => {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...imagePreviews]);

    // Pass the files to the parent component
    if (onImagesChange) {
      onImagesChange(imageFiles); // Pass the actual file objects
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    // Update the parent component with the remaining images
    if (onImagesChange) {
      onImagesChange(updatedImages);
    }
  };

  return (
    <>
    <div
      className={`border-2 border-dashed rounded-lg p-4 ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
        id="fileUpload"
      />

      <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center justify-center h-32">
        <span className="text-gray-600 mb-2">Drag & Drop your images here, or click to select</span>
        <button
          className="px-4 py-2 text-white font-semibold bg-primary rounded-md hover:bg-pink-600"
          onClick={() => document.getElementById('fileUpload').click()}
        >
          Select Files
        </button>
      </label>

      {/* Preview Area */}
      <div className="flex gap-4 flex-wrap mt-4">
        {images.map((src, index) => (
          <div key={index} className="relative w-32 h-32 border rounded-lg overflow-hidden">
            <img src={src} alt={`preview-${index}`} className="object-cover w-full h-full" />
            <button
              onClick={() => handleDeleteImage(index)}
              className="absolute top-1 right-1 bg-slate-700/50 text-white rounded-full h-6 w-6 hover:bg-red-700 m-auto"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default DragDropImageUploader;
  