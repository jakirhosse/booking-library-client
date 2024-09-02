import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import uselernData from "../../../Hook/useLernData/uselernData";
import { AuthContext } from "../../../Providers/AuthProvider";
import SingleUntilCard from "./SingleUntilCard";
import { Helmet } from "react-helmet-async";
import LazyLoder from "../../../Components/LazyLoder/LazyLoder";


const Learning = () => {
        const [allLearnData, refetch, isLoading] = uselernData();
        refetch();
        const [axiosSecure] = useAxiosSecure();
        const { user }: any = useContext(AuthContext)
        const [singleUser, setSingleUser]: any = useState({});
      

        useEffect(() => {
                axiosSecure.get(`/users/singleUser?email=${user?.email}`).then((result) => {
                  setSingleUser(result.data);
                });
              }, [user.email, axiosSecure]);
            
        return (
                <>
                <Helmet>
                  <title> Learning | Lang Master </title>
                </Helmet>
          
                {isLoading ? (
                  <LazyLoder></LazyLoder>
                ) : (
                  <div className="px-4 py-8 md:px-20 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {allLearnData.map((singleUnit: any) => (
                     <SingleUntilCard
                     key={singleUnit._id}
                     singleUnit={singleUnit}
                     singleUser={singleUser} 
                     ></SingleUntilCard>
                    ))}
                  </div>
                )}
              </>
        );
};

export default Learning;

