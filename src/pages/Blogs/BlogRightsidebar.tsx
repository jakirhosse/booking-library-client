import { useState } from "react";
import { Link } from "react-router-dom";

interface BlogRightSidebarProps {
  items: {
    _id: number;
    name: string;
    image: string;
    title: string;
    description?: string; // Made description optional
  }[];
}

const BlogRightsidebar: React.FC<BlogRightSidebarProps> = ({ items }) => {
  const [showAll, setShowAll] = useState<boolean>(false);

  return (
    <div>
      {items.length === 0 ? (
        <p className="text-xl bg-base-200 text-center my-3 py-3 font-bold text-gray-500">
          You don't have any blogs yet
        </p>
      ) : (
        <>
          {items.slice(0, showAll ? items.length : 1).map((item) => (
            <Link to={`/singleBlogCard/${item._id}`} key={item._id}>
              <div className="rounded-md bg-base-100 shadow-md my-3">
                <figure>
                  <img
                    className="h-40 w-full object-cover rounded-tl-md rounded-tr-md"
                    src={item.image}
                    alt="Blog"
                  />
                </figure>
                <div className="p-2">
                  <div className="badge badge-secondary">{item.name}</div>
                  <h2 className="card-title">{item.title}</h2>
                  <p>
                    {item.description
                      ? item.description.slice(0, 60)
                      : "No description available"}
                  </p>
                  <div className="card-actions justify-end"></div>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
      {items.length === 0 ? null : (
        <p
          className="text-xl underline text-center cursor-pointer"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show less" : "Show more"}
        </p>
      )}
    </div>
  );
};

export default BlogRightsidebar;
