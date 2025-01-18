import { BlogCard } from "../components/blog-card";
import { useBlogs } from "../hooks/useBlogs";
import { Loader } from "../components/loader";
import { Appbar } from "../components/appbar";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className=" max-w-xl">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate={blog.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
