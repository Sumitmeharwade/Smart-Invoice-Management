"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FiUploadCloud } from "react-icons/fi";
import { extractDataFromFile } from "./geminiService";
import { setInvoices } from "../redux/slices/invoiceSlice";
import { setProducts } from "../redux/slices/productSlice";
import { setCustomers } from "../redux/slices/customerSlice";

const FileUpload = () => {
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleFile = async (file) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Validate file type
      const validTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (!validTypes.includes(file.type)) {
        throw new Error(
          "Unsupported file type. Please upload PDF, Excel, or image files."
        );
      }

      // Extract data using Gemini API
      const result = await extractDataFromFile(file);

      if (!result) {
        throw new Error( "Failed to process the file.");
      }

      var resultData = result.data;
    //   console.log(resultData);
      console.log("hehe Invoice");
      console.log(resultData.invoices);
      dispatch(setInvoices(resultData.invoices));
    //   console.log(resultData.products);
      dispatch(setProducts(resultData.products));
    
      
      dispatch(setCustomers(resultData.customers));
    } catch (err) {
      setError(err.message || "An error occurred during file processing.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#030712] rounded-lg shadow-sm p-4 sm:p-6 mb-8">
      <div
        className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center ${
          isDragging ? "border-green-600 bg-green-50" : "border-gray-300"
        } duration-200`}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files[0];
          handleFile(file);
        }}
      >
        {isProcessing ? (
          <div className="animate-pulse">
            <FiUploadCloud className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Processing file...</p>
          </div>
        ) : (
          <>
            <FiUploadCloud className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
            <div className="mt-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.xlsx,.xls,image/*"
                  onChange={(e) => handleFile(e.target.files[0])}
                />
                <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-[#DDE6ED] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-colors duration-200">
                  Upload Files
                </span>
              </label>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              Support for PDF, Excel files, and Images
            </p>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
