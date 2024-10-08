import React from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import useQuize from "../../../Hook/useQuize/useQuize";
import LazyLoder from "../../../Components/LazyLoder/LazyLoder";

interface QuizData {
  _id: string;
  Level: string;
  // Add other properties as needed
}

const QuizLevel: React.FC = () => {
  const [allQuizeData, refetch, isLoading] = useQuize();
  refetch();
  return (
    <>
      <Helmet>
        <title> Practice | Lang Master </title>
      </Helmet>
      <div className="flex items-center flex-col justify-center h-full">
        {isLoading ? (
          <LazyLoder></LazyLoder>
        ) : (
          <div
            className="bg-[#8ED0A3] rounded-lg md:w-[60%]"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
            }}
          >
            <h1 className="text-3xl font-semibold p-4 text-center uppercase rounded-t-lg bg-[#222] text-white">
              প্র্যাকটিস লেভেল
            </h1>
            <div className="px-9 py-10 space-y-4">
              {allQuizeData.map((quizdata: QuizData) => (
                <Link
                  to={`/user-dashboard/mainquiz/${quizdata._id}`}
                  key={quizdata._id}
                >
                  <button
                    // style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.10) 0px 10px 20px, rgba(0, 0, 0, 0.20) 0px 6px 6px",
                    }}
                    className="bg-[#DDF4FF] text-2xl px-6 py-4 capitalize font-semibold mb-5 w-full  hover:text-white border-none cursor-pointer hover:bg-[#088395] rounded-md"
                  >
                    <p>{quizdata?.Level} Practice</p>
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizLevel;