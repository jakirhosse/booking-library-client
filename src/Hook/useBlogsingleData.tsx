import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useBlogsingleData = (id: string | undefined) => {
  const [axiosSecure] = useAxiosSecure()
  const {
    data: singleBlog = [],
    isLoading: loading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["singleBlog", id],
    queryFn: async () => {
      if (!id) {
        console.error("Error: ID is undefined.");
        return;
      }
      const res = await axiosSecure.get(`/blogs/blog/${id}`);
      return res.data;
    },
    enabled: !!id, // Disable query if id is undefined
  });

  if (error) {
    console.error("Error fetching blog data:", error);
  }

  return { singleBlog, loading, refetch };
};

export default useBlogsingleData;
