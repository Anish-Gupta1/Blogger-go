import axios from "axios";
import { useState } from "react";
import { Backend_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handlePublish = async () => {

    if (!title || !content) {
      alert("Please fill in both the title and content.");
      return;
    }
    const post = {
        title,
        content
    }
    try{
        const res = await axios.post(`${Backend_URL}/api/v1/blog`, post ,{
            headers: {
                Authorization : localStorage.getItem("authorization")
            }})
        navigate(`/blog/${res.data.id}`)
    } catch(e) {
        alert({e});
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Publish a New Post
        </h1>

        {/* Title Input */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter the title"
          />
        </div>

        {/* Content Textarea */}
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Write your content here..."
            rows={10}
          />
        </div>

        
        <div className="flex justify-end">
          <button
            onClick={handlePublish}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100  focus:ring-gray-100  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 px-6 py-2 rounded-md transition duration-200"
          >
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
};
