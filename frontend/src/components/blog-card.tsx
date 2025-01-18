interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="py-2">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-100 ease-in-out">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">{authorName}</span>{" "}
              · {publishedDate}
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
              {Math.ceil(content.length / 100)} min read
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
};
