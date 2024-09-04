import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import uselernData from "../../../Hook/useLernData/uselernData";
import { AuthContext } from "../../../Providers/AuthProvider";
import SingleUntilCard from "./SingleUntilCard";
import { Helmet } from "react-helmet-async";
import LazyLoder from "../../../Components/LazyLoder/LazyLoder";

const Learning = () => {
  const [allLearnData, refetch, isLoading] = uselernData();
  const [axiosSecure] = useAxiosSecure();
  const { user }: any = useContext(AuthContext);
  const [singleUser, setSingleUser]: any = useState({});

  useEffect(() => {
    // user object exists and has email before making request
    if (user && user.email) {
      console.log("User object:", user);
      console.log("User email:", user?.email);

      // Fetch user data only if the user and email are available
      axiosSecure
        .get(`/users/singleUser?email=${user.email}`)
        .then((result) => {
          setSingleUser(result.data);
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
        });
    } else {
      console.warn("User is null or email is missing");
    }
  }, [user, axiosSecure]);

  return (
    <>
      <Helmet>
        <title> Learning | Book </title>
      </Helmet>

      {isLoading ? (
        <LazyLoder />
      ) : (
        <div className="px-4 py-8 md:px-20 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {allLearnData.map((singleUnit: any) => (
            <SingleUntilCard
              key={singleUnit._id}
              singleUnit={singleUnit}
              singleUser={singleUser}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Learning;
