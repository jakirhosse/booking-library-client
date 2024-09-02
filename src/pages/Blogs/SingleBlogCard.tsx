import { Link, useParams } from "react-router-dom";
import useBlogData from "../../Hook/useBlogData";
import useBlogsingleData from "../../Hook/useBlogsingleData";
import { useEffect, useState } from "react";
import Shear from "./Shear/Shear";
import Like from "./Like/Like";
import { AiTwotoneMail } from "react-icons/ai";

const SingleBlogCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { blog } = useBlogData();
  const { singleBlog } = useBlogsingleData(id);

  // Check if singleBlog and blog are not undefined
  const ownBlog = blog?.filter(
    (own: any) => own.email === singleBlog?.email && own._id !== singleBlog?._id
  ) || [];

  const [sharedData] = useState(null);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  if (!id) {
    return <div>Error: Blog ID is not defined.</div>;
  }

  return (
    <div className="md:flex w-10/12 py-4 my-8 mx-auto gap-10">
      <div
        className="md:w-[60%] md:sticky top-0 h-full"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <img
          className="w-full h-[350px] object-cover rounded-lg"
          src={singleBlog?.image}
          alt="post image"
        />
        <p className="text-gray-400 mt-2">{singleBlog?.uploadedtime}</p>
        <h1 className="text-3xl my-2 font-semibold capitalize">
          {singleBlog?.title}
        </h1>
        <p className="text-xl text-gray-600">{singleBlog?.description}</p>

        <hr className="my-4" />

        <div className="card-actions justify-between m-4 font-semibold text-2xl items-center">
          <Like postId={singleBlog?._id} like={singleBlog?.like} likedUsers={singleBlog?.likedUsers}></Like>
          <button className="flex gap-2 ">
            <Shear id={id} />
          </button>
        </div>

        {sharedData && <div>Shared: {sharedData}</div>}

        <hr className="my-4" />
      </div>

      <div className="md:w-[35%] mx-auto text-center" data-aos="zoom-in" data-aos-duration="1000">
        <h2 className="capitalize text-3xl font-semibold">publisher</h2>
        <hr className="my-4" />
        <div className="flex gap-1">
          <img className="w-[100px] mx-auto h-[100px] object-cover" src={singleBlog?.authorImage} alt="" />
          <div className="text-start">
            <h2 className="text-2xl my-3 font-semibold">{singleBlog?.name}</h2>
            <p className="flex gap-1 text-lg">
              <AiTwotoneMail className="text-3xl" /> : {singleBlog?.email}
            </p>
          </div>
        </div>
        <hr className="my-4" />

        <h4 className="text-2xl mb-2 font-semibold">More Content</h4>
        {ownBlog?.map((blog: any) => (
          <div key={blog._id}>
            <Link to={`/singleBlogCard/${blog?._id}`}>
              <div className="flex gap-2 mb-3 bg-base-200 hover:bg-base-300 cursor-pointer">
                <img className="w-20 h-20 object-cover" src={blog?.image} alt="blog" />
                <div className="text-start">
                  <h3 className="font-semibold text-xl">{blog?.title}</h3>
                  <p>{blog?.description?.slice(0, 15)}...</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleBlogCard;
