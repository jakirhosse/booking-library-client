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
        if (data.image) {
            formData.append("image", data.image);
        }

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
                toast("Profile update failed!");
            }
        } catch (error) {
            toast.error("Error updating profile!");
        }

        handleModalClose();
    };

    return (
        <div>
            <Helmet>
                <title>Profile - Aline</title>
            </Helmet>
            <section className="profile-section">
                <div className="profile-container">
                    <div className="profile-details">
                        <div className="profile-header">
                            <div className="profile-header-info">
                                <h1>{user?.displayName}</h1>
                                <button onClick={handleEditButtonClick}>
                                    <FaEdit />
                                </button>
                            </div>
                            <p className="profile-bio">{singleUser?.bio}</p>
                        </div>

                        <div className="profile-details">
                            <div className="detail-item">
                                <ImLocation2 />
                                <span>{singleUser?.address}</span>
                            </div>
                            <div className="detail-item">
                                <MdEmail />
                                <span>{user?.email}</span>
                            </div>
                            <div className="detail-item">
                                <BsTelephone />
                                <span>{singleUser?.phoneNumber}</span>
                            </div>
                            <div className="detail-item">
                                <FaCoins />
                                <span>{singleUser?.birthday}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ProfileEditModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                singleUser={singleUser}
            />
        </div>
    );
};

export default Profile;
