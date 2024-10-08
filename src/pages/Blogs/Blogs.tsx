import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useBlogData from "../../Hook/useBlogData";
import { AuthContext } from "../../Providers/AuthProvider";
import BlogRightsidebar from "./BlogRightsidebar";
import BlogMainContainer from "./BlogMainContainer";
import BlogPost from "./BlogPost";
import SearchBlog from "./SearchBlog";
import SubHeader from "../../Components/SubHeader/SubHeader";

const Blogs = () => {
  const [search, setSearch] = useState("");

  const { blog } = useBlogData();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const { user }: any = useContext(AuthContext);
  const myBlogs = blog.filter((item: any) => item.email === user?.email);

  // Sort and filter blogs
  const sortedBlog = [...blog].sort(
    (a: any, b: any) =>
      new Date(b.uploadedtime).getTime() - new Date(a.uploadedtime).getTime()
  );

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  // Filter blogs safely
  const filterblog = sortedBlog.filter(
    (item) =>
      (item?.title && item.title.toLowerCase().includes(search.toLowerCase())) ||
      (item?.name && item.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <Helmet>
        <title>Blogs | Lang Master</title>
      </Helmet>
      <SubHeader title="Blog" />
      <div className="w-11/12 mx-auto">
        <div className="flex md:flex-row gap-6 flex-col-reverse items-center justify-between">
          <BlogPost />
          <SearchBlog handleSearch={handleSearch} />
        </div>
        <div className="md:flex gap-6 mt-5">
          {filterblog.length <= 0 ? (
            <p className="text-2xl text-gray-600 text-center my-5 w-full uppercase">
              "no data found"
            </p>
          ) : (
            <div
              className={`${myBlogs.length > 0 ? "mx-auto w-[95%]" : "w-full"}`}
            >
              <BlogMainContainer filterblog={filterblog} />
            </div>
          )}
          <div
            className="md:w-[30%] mx-auto top-10 h-full overflow-auto sticky"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <h1 className="text-center text-3xl font-semibold rounded-md py-2 bg-base-200">
              My Blogs
            </h1>
            <BlogRightsidebar items={myBlogs} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
