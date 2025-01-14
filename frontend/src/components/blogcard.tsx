import React from 'react';

interface BlogProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
}

const Blog: React.FC<BlogProps> = ({ title, excerpt, author, date }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span className="font-medium">{author}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default Blog;

