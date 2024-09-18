import { useState } from "react";
import payCoin from "../../../../public/payCoin.json";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import BuyingAmount from "./BuyingAmount";
import Lottie from "lottie-react";

const CoinBuy = () => {
    const [coinAmount, setCoinAmount] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCoinAmountChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCoinAmount(Number(event.target.value));
    };

    const totalAmountToBePaid = (coinAmount * 0.1).toFixed(2);

    return (
        <>
            <Helmet>
                <title>Coin Buy | Lang Master</title>
            </Helmet>
            <div className="px-4 py-8 md:px-20 md:py-16">
                <SectionTitle titleLetter="কয়েন " titleWord="কিনুন"></SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2 border p-6 mt-10 rounded-lg shadow-lg border-[#8ED0A3]">
                    {/* Left Side */}
                    <div className="col-span-5">
                        <div className="my-5">
                            <label>
                                <span className="block my-3 font-semibold">
                                    কত কয়েন কিনতে চান তা লিখুনঃ
                                </span>
                                <input
                                    type="number"
                                    placeholder="এখানে লিখুন"
                                    name="coin"
                                    onChange={handleCoinAmountChange}
                                    className="input input-bordered border-[#8ED0A3] focus:outline-[#8ED0A3] input-primary w-full max-w-xs"
                                    required
                                />
                                <button
                                    onClick={openModal}
                                    className="defaultBtn hover:cursor-pointer block mt-4"
                                    disabled={!coinAmount}
                                >
                                    Buy now
                                </button>
                            </label>
                            {isModalOpen && (
                                <div className="fixed inset-0 z-40 flex items-center justify-center">
                                    <div className="modal modal-open">
                                        <div className="modal-box">
                                            <div className="modal-body p-6">
                                                <BuyingAmount
                                                    coinAmount={coinAmount}
                                                    totalAmountToBePaid={totalAmountToBePaid}
                                                    closeModal={closeModal}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="pt-14">
                                <h3 className="font-semibold text-base">
                                    কয়েন দিয়ে কি করতে পারবে?
                                </h3>
                                <p className="max-w-xl font-thin text-slate-700">
                                    কয়েন ব্যবহার করে একজন ইউজার আমাদের পিডিএফ বই অথবা প্রয়োজনীয়
                                    ডকুমেন্ট কিনতে পারবে। সেইসাথে নতুন ইউনিট আনলক করার ক্ষেত্রেও
                                    কয়েন কাজে আসবে।
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="col-span-7">
                        <Lottie
                            animationData={payCoin}
                            loop={true}
                            autoplay={true}
                            style={{ height: 500 }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CoinBuy;
