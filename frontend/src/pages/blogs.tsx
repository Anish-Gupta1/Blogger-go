import { Appbar } from "../components/appbar";
import { BlogCard } from "../components/blog-card";
import { useBlog } from "../components/useBlog";

export const Blogs = () => {
  const { loading, blogs } = useBlog();
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className=" max-w-xl">
          {blogs.map((blog) => (
            <BlogCard
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
