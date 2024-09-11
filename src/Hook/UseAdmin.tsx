import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const UseAdmin = () => {
        const { user, loading }: any = useContext(AuthContext);
        const [axiosSecure] = useAxiosSecure();
        const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
          queryKey: ["isAdmin", user?.email],
          enabled: !loading,
          queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin?email=${user?.email}`);
            return res.data.admin;
          },
        });
        return [isAdmin, isAdminLoading];
};

export default UseAdmin;