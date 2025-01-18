import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import { Date } from "../components/blog-card";
import { Loader } from "../components/loader";
import { Appbar } from "../components/appbar";

type Blog = {
  title: string;
  author: {
    name: string;
  };
  date: string;
  content: string;
};

export const Blog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  return (
    <div>
      <Appbar />
      <article className="max-w-3xl mx-auto px-6 py-8 bg-white shadow-md rounded-lg border border-gray-200">
        <header className="mb-8 border-b border-gray-300 pb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center justify-between text-gray-600 text-sm">
            <div className="mr-4 flex items-center ">
              <span>{blog.author.name}</span>
            </div>
            <span className="flex items-center">
              <Date date={blog.date} />
            </span>
          </div>
        </header>
        <div className="prose prose-lg max-w-none leading-relaxed text-gray-800">
          {blog.content}
        </div>
      </article>
    </div>
  );
};
