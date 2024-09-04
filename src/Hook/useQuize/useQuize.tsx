import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const useQuize = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: allQuizeData = [], refetch, isLoading } = useQuery({
    queryKey: ["quizs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/quizs/quizs");
      return res.data;
    },
  });

  return [allQuizeData, refetch, isLoading];
};

export default useQuize;
