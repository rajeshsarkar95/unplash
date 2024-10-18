/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Main_containt.css";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";

const UnsplashGallery = ({ query }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  const accessKey = "WnCIce1djIBBcuUObsfHvk4rvJFkQZppLrIc8cNdPtE";

  useEffect(() => {
    fetchImages();
  }, [query, page]);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=10&page=${page}`
      );
      setImages(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching data from Unsplash:", error);
      setError("Error fetching images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (newPage) => {
    setPage(newPage);
  };

  const handleNextClick = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const maxButtons = 10;
  const startPage = Math.max(1, page - Math.floor(maxButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxButtons - 1);

  return (
    <div className="main_container">
      <div className="pagination">
        <div
          className="page-button_icon"
          onClick={handlePrevClick}
          disabled={page === 1}
        >
          <i><IoIosArrowDropleft /></i>
        </div>
        {startPage > 1 && (
          <button className="page-button" onClick={() => handlePageClick(1)}>
            1
          </button>
        )}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            className={`page-button ${
              page === startPage + index ? "active" : ""
            }`}
            onClick={() => handlePageClick(startPage + index)}
          >
            {startPage + index}
          </button>
        ))}
        <div
          className="page-button_icon"
          onClick={handleNextClick}
          disabled={page === totalPages}
        >
         <i><IoIosArrowDropright /></i>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading...</p>}
      <div className="image-grid">
        {images.map((image) => (
          <div key={image.id} className="image-item">
            <img src={image.urls.small} alt={image.alt_description} />
            <p>{image.user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnsplashGallery;
