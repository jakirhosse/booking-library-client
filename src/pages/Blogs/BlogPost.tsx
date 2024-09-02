import { useContext, useState } from "react";
import BlogPostModel from "./BlogPostModel";
import { AuthContext } from "../../Providers/AuthProvider";

const BlogPost: React.FC = () => {
  const [openPostModal, setOpenPostModal] = useState<boolean>(false);
  const { user }: any = useContext(AuthContext);

  // Safely split the user's display name
  const userNameWords = user?.displayName ? user.displayName.split(" ") : [];
  const userName = userNameWords.slice(0, 2).join(" ");

  return (
    <div className="md:w-[75%]">
      <div
        onClick={() => setOpenPostModal(true)}
        className="py-4 bg-base-100 rounded-xl"
      >
        <div className="flex items-center gap-3 p-1">
          {user ? (
            <img
              className="w-10 h-10 object-cover rounded-full"
              src={user?.photoURL}
              alt="User"
            />
          ) : (
            <img
              className="w-10 h-10 object-cover rounded-full"
              src="userpng"
              alt="User"
            />
          )}
          <div className="flex items-center w-full">
            <div
              className="py-2 md:px-4 px-1 w-full cursor-pointer"
              style={{ borderBottom: '2px solid #999' }}
            >
              <p className="text-gray-400">{`What's on your mind, ${userName}?`}</p>
            </div>
          </div>
        </div>
      </div>
      {openPostModal && <div className="overlayCustom" />}
      {openPostModal && (
        <BlogPostModel setOpenPostModal={setOpenPostModal} />
      )}
    </div>
  );
};

export default BlogPost;
