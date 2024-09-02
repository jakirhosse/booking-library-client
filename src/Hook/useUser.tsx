import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {

        const [axiosSecure]= useAxiosSecure();
        const {user}: any = useContext(AuthContext)
        const email = user?.email;
        const {
                data: singleUser,
                isLoading,
                refetch,
              } = useQuery({
                queryKey: ["singleUser", email],
                queryFn: async () => {
                  const res = await axiosSecure.get(`/users/singleUser?email=${email}`);
                  return res.data;
                },
              });
            
              return [singleUser, isLoading, refetch];
            };


export default useUser;