import { useContext, useState } from "react";
import "./Profile.css";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import toast from "react-hot-toast";
import { FaCoins, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ImLocation2 } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { Helmet } from "react-helmet-async";
import ProfileEditModal from "./ProfileEditModal";
import useUser from "../../../Hook/useUser";
import { SubmitHandler, FieldValues } from "react-hook-form";

const Profile = () => {
    const { user }: any = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [singleUser, , refetch] = useUser();

    const handleEditButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalSubmit: SubmitHandler<FieldValues> = async (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        const url = `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
        }`;

        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });
        const result = await response.json();
        const imageUrl = result?.data?.display_url;

        try {
            const updatedData = {
                name: data.name,
                bio: data.bio,
                birthday: data.birthday,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                image: imageUrl,
            };
            const response = await axiosSecure.patch(
                `/users/update-user/${user?.email}`,
                { updatedData }
            );
            if (response.data.modifiedCount > 0) {
                toast("Successfully updated user profile:", response.data);
                refetch();
            } else {
                toast("Error updating user profile:", response.data);
            }
        } catch (error) {
            toast.error("Error updating user profile");
            console.error("Error updating user profile:", error);
        }
    };

    return (
        <div className="px-4 py-8 md:px-20 md:py-16">
            <Helmet>
                <title>Profile | Lang Master</title>
            </Helmet>
            <div className="md:flex h-full gap-4 lg:gap-8 mt-5 border-2 rounded-2xl p-10 bg-gray-100 shadow">
                <div
                    className="border rounded-lg shadow-md"
                    style={{ height: "100%", width: "100%" }}
                >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg ">
                        <figure>
                            <img
                                src={singleUser?.image}
                                alt="Profile Picture"
                                className="w-52 rounded-full md:h-52 p-6 object-cover"
                            />
                        </figure>
                        <div className="px-4">
                            <div className="flex justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold py-2 fontKalam">
                                        {singleUser?.name}
                                    </h2>
                                    <p className="fontKalam text-[#757575] flex items-center gap-3">
                                        {singleUser?.bio}
                                    </p>
                                </div>
                                <div className="text-right m-3">
                                    <button className="tooltip" onClick={handleEditButtonClick}>
                                        <span className="tooltiptext">Edit</span>
                                        <FaEdit className="text-xl" />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-5">
                                <p className="text-gray-600 flex items-center gap-3">
                                    <BsTelephone /> {singleUser?.phoneNumber}
                                </p>
                                <hr className="py-2" />
                                <p className="text-gray-600 flex items-center gap-3">
                                    <MdEmail /> {singleUser?.email}
                                </p>
                                <hr className="py-2" />
                                <p className="text-gray-600 flex items-center gap-3">
                                    <ImLocation2 /> {singleUser?.address}
                                </p>
                            </div>
                            <hr className="py-2" />
                        </div>
                    </div>
                </div>

                <div style={{ height: "450px", width: "100%" }}>
                    {/* one */}
                    <div className=" bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg border">
                        <div className="p-4 space-y-5">
                            {/* user payment History */}
                            <div className="flex justify-between">
                                <p className="text-xl fontKalam font-semibold">My payment</p>
                                <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold w-48 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300">
                                    <Link to="/user-dashboard/userPaymentData">
                                        <span className="text-sm">View All</span>
                                    </Link>
                                </button>
                            </div>

                            <hr />
                            <div className="text-center fontKalam">
                                <p className="text-2xl font-semibold">
                                    {singleUser?.amount} <FaCoins className="inline" />
                                </p>
                                <p>Available Coins</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <ProfileEditModal
                    user={singleUser}
                    onClose={handleModalClose}
                    onSubmit={handleModalSubmit}
                />
            )}
        </div>
    );
};

export default Profile;
