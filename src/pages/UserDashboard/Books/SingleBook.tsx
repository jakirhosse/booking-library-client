import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Swal from "sweetalert2";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../Providers/AuthProvider";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import useUser from "../../../Hook/useUser";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

interface SingleBookProps {
  selectedBook: any;
  handleModalClose: () => void;
}

const SingleBook: React.FC<SingleBookProps> = ({
  selectedBook,
  handleModalClose,
}) => {
  const [singleUser] = useUser();
  const { user }: any = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const bookInfo = {
    userName: user?.displayName,
    email: user?.email,
    bookId: selectedBook?.bookId,
    bookName: selectedBook?.bookname,
    writer: selectedBook?.writer,
    downloadUrl: selectedBook?.downloadUrl,
    date: new Date(),
  };

  const handleBuyNow = async () => {
    const bookPrice = selectedBook?.price;
    if (singleUser?.score >= selectedBook?.price) {
      Swal.fire({
        title: "Are you sure?",
        text: `এই বইটি কেনার জন্য আপনার একাউন্ট থেকে ${selectedBook.price} কয়েন কেটে নেওয়া হবে।`,
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Sure!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axiosSecure.patch(
            `/users/user/${user?.email}`,
            {
              score: -bookPrice,
            }
          );
          if (response.data.modifiedCount > 0) {
            Swal.fire("Success!", "You Bought This Book.", "success");
            const res = await axiosSecure.post("/books/bought-book", {
              bookInfo,
            });
            if (res.data.insertedId) {
              navigate("/user-dashboard/bought-books");
            }
          }
        }
      });
    } else {
      Swal.fire({
        title: "একাউন্টে যথেষ্ট কয়েন নেই?",
        text: "কয়েন কিনুন পেইজ থেকে কয়েন কিনুন!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Sure!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/user-dashboard/coin");
        }
      });
    }
  };

  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleModalClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white p-4 sm:p-6 rounded-lg">
                    <button
                      className="absolute top-2 right-2"
                      onClick={handleModalClose}
                    >
                      <AiFillCloseCircle size={24} />
                    </button>
                    <img
                      className="h-40 w-full object-cover rounded-t-lg"
                      src={selectedBook?.bookimage}
                      alt="Selected Book"
                    />
                    <h3 className="text-xl font-semibold mt-4">
                      {selectedBook?.bookname}
                    </h3>
                    <p className="mt-2">
                      <b>Writer:</b> {selectedBook?.writer}
                    </p>
                    <p className="mt-2">
                      <b>Price:</b>{" "}
                      <span className="text-green-500 font-semibold">
                        {selectedBook?.price} Coin
                      </span>
                    </p>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={handleBuyNow}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SingleBook;
