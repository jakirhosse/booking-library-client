import "swiper/css";
import "swiper/css/navigation";
import './Cover.css'

import shap1 from "../../../../public/shape-1.svg";
import shap2 from "../../../../public/shape-2.svg";
import shap3 from "../../../../public/shape-3.svg";
import { AiOutlineArrowRight } from "react-icons/ai";
import useLederBroadData from "../../../Hook/useLederBroadData/useLederBroadData";
import { Link } from "react-router-dom";

interface CoverProps {
        // Define any props you might pass to the component
      }
      
      interface TUserPoints {
        email: string;
        image: string;
        name: string;
        phoneNumber: string;
        role: string;
        score: number;
        unit: string[];
        _id: string;
      }
const Cover: React.FC<CoverProps> = () => {
        const { allLeaderBoardData: usersPoint } = useLederBroadData();
        return (
                <div className="bg-gradient-to-r from-[#95d3a2] to-[#3557ac] mt-1">
                <div className="banner md:flex items-center justify-between relative md:py-0 pb-16 md:h-[90vh] md:px-7 gap-20 w-11/12 mx-auto pt-12">
                  <div className="absolute animatespin h-20 w-20 opacity-95 hidden md:block right-10 bottom-32">
                    <img src={shap1} />
                  </div>
                  <div className="animate-updown hidden md:block absolute top-10  left-[45%] h-20 w-20 opacity-80">
                    <img src={shap2} />
                  </div>
                  <div className="animate-updown hidden md:block absolute top-24  left-[9%] h-20 w-20 opacity-80">
                    <img src={shap3} />
                  </div>
          
                  <div className="imgbanner relative md:h-[430px] h-[300px] rounded-full md:ml-[50px] md:w-1/2">
                    <img
                      className="w-full h-full"
                      src="https://i.ibb.co/s1vDwGW/banner-img-1.png"
                      alt="banner img"
                      loading="lazy"
                    />
                  </div>
                  <div className="md:w-1/2 text-center mt-10 md:mt-0">
                    <h1 className="text-4xl md:text-6xl font-semibold text-white">
                      Improve your English
                    </h1>
                    <p className="text-xl md:text-2xl my-4 text-gray-200">
                      One of the app's standout features is its robust{" "}
                      <span className="text-[#eebb2e]">progress</span> tracking system,
                      allowing learners to monitor their advancements and set achievable{" "}
                      <span className="text-[#eebb2e]">goals</span>.
                    </p>
          
                    <div className="flex my-2 justify-center">
                      {usersPoint.slice(0, 3).map((userPoint: TUserPoints) => (
                        <img
                          key={userPoint._id}
                          className="w-10 h-10 rounded-full border-2"
                          src={userPoint?.image}
                        />
                      ))}
                      <p className="md:flex items-center gap-2 text-white ml-3">
                        People already trusted us{" "}
                        <Link to="/user-dashboard/leader-board">
                          <span className="flex items-center text-[#eebb2e] underline cursor-pointer gap-1">
                            view People
                            <AiOutlineArrowRight />
                          </span>
                        </Link>
                      </p>
                    </div>
                    <div className="text-center">
                      <Link to="/user-dashboard/learning">
                        <button className="button-52 mt-4" role="button">
                          get Started
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
        );
};

export default Cover;