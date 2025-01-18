import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="py-2">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-100 ease-in-out">
        <div className="p-6" onClick={() => navigate(`../blog/${id}`)}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">{authorName}</span>
            </p>
            <span className="text-xs text-gray-500">
              <Avatar name={authorName} />
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-300">
            {title}
          </h2>
          <p className="text-gray-600 mb-4">
            {content.slice(0, 100)}
            {content.length > 100 && (
              <>
                ...
                <span className="text-blue-600 hover:underline cursor-pointer">
                  Read more
                </span>
              </>
            )}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              <Readtime length={content.length} />
            </span>
            <span className="text-sm text-gray-600">
              <Date date={publishedDate} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden  bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
};
export const Date = ({ date }: { date: string }) => {
  const ymd = date.split("-");
  return (
    <div>
      {ymd[2].split("T")[0]}-{ymd[1]}-{ymd[0]}
    </div>
  );
};

export const Readtime = ({ length }: { length: number }): JSX.Element => {
  return <div>{Math.ceil(length / 500)} min read</div>;
};
