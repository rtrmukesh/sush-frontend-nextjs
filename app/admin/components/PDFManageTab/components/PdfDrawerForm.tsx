"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaUpload, FaCloudUploadAlt, FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PdfDrawerFormProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

const PdfDrawerForm: React.FC<PdfDrawerFormProps> = ({
  isOpen,
  onClose,
  refetch
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    size: "",
    category: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        setFormData((prev) => ({
          ...prev,
          name: file.name.split(".")[0],
          title: file.name.split(".")[0],
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        }));
      } else {
        toast.error("Please select a PDF file");
      }
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setFormData((prev) => ({
        ...prev,
        name: file.name.split(".")[0],
        title: file.name.split(".")[0],
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      }));
    } else {
      toast.error("Please drop a PDF file");
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (!selectedFile) {
        toast.error("Please select a PDF file");
        return;
      }

      if (!formData.name) {
        toast.error("Name is required");
        return;
      }

      setIsSubmitting(true);

      const fileData = new FormData();
      fileData.append("file", selectedFile);
      fileData.append("name", formData.name ?? "");
      fileData.append("description", formData.description ?? "");
      fileData.append("size", formData.size ?? "");
      fileData.append("category", formData.category ?? "");
      const response = await fetch("/api/pdf/upload", {
        method: "POST",
        body: fileData,
      });

      if (!response.ok) {
        toast.error("Failed to upload PDF file");
        setIsSubmitting(false);
        return;
      }
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        resetForm();
        refetch();
        onClose();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      size: "",
      category: "Document",
    });
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Close drawer on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Reset form when drawer opens/closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-1/2 lg:w-1/3 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Add New PDF</h2>
              <p className="text-gray-600 text-sm mt-1">
                Upload and manage your PDF documents
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <FaTimes className="text-gray-500 text-xl" />
            </button>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PDF File <span className="text-red-500">*</span>
                </label>
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : selectedFile
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept=".pdf"
                    className="hidden"
                  />

                  {selectedFile ? (
                    <div className="flex flex-col items-center">
                      <FaCloudUploadAlt className="text-4xl text-green-500 mb-4" />
                      <p className="font-medium text-gray-800">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          setFormData((prev) => ({ ...prev, size: "" }));
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        className="mt-4 text-sm text-red-600 hover:text-red-700"
                      >
                        Remove File
                      </button>
                    </div>
                  ) : (
                    <>
                      <FaUpload className="text-4xl text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        <span className="text-blue-600 font-medium">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-sm text-gray-500">
                        PDF files only (Max: 50MB)
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black
                   placeholder-gray-500"
                  placeholder="Enter PDF name"
                  required
                />
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-black
                   placeholder-gray-500"
                  placeholder="Enter PDF description"
                />
                <p className="text-sm text-gray-500 mt-2">
                  {formData.description.length}/500 characters
                </p>
              </div>

              {/* Size and Type Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size
                  </label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black
                   placeholder-gray-500"
                    placeholder="e.g., 4.2 MB"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black
                   placeholder-gray-500"
                  >
                    <option value="ReactJS">React JS</option>
                    <option value="NodeJS">Node JS</option>
                    <option value="NextJS">Next JS</option>
                    <option value="ExpressJS">Express JS</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="TypeScript">TypeScript</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="TailwindCSS">Tailwind CSS</option>
                    <option value="MongoDB">MongoDB</option>
                    <option value="MySQL">MySQL</option>
                    <option value="PostgreSQL">PostgreSQL</option>
                    <option value="Firebase">Firebase</option>
                    <option value="RESTAPI">REST API</option>
                    <option value="Authentication">Authentication</option>
                    <option value="SystemDesign">System Design</option>
                    <option value="Deployment">Deployment</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="border-t p-6">
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting || !selectedFile}
                className={`px-6 py-3 rounded-lg transition flex items-center gap-2 ${
                  isSubmitting || !selectedFile
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <FaUpload />
                    Upload PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PdfDrawerForm;
