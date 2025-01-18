import { Link } from "react-router-dom";
import { Avatar } from "./blog-card";

export const Appbar = () => {
  return (
    <div className="border-b flex justify-between py-5 px-10 ">
      <Link to={"/blogs"}>Blogger-Go</Link>
      <div className="flex items-center">
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-small mr-5 rounded-full text-sm px-2 pt-1 pb-1 me-2 my-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Publish
          </button>
        </Link >
        <Avatar name={""} />
      </div>
    </div>
  );
};
