import { FaLock, FaUnlock } from "react-icons/fa";
import { Link } from "react-router-dom";
import cardBg from "../../../assets/assets/learningCardBg.svg";

interface SingleUntilCardProps {
  singleUnit: {
    _id: string;
    unit: string;
    topic: string;
    points: number;
    progress: string;
    totalLessons: number;
  };
  singleUser?: {
    unit?: string[];
  };
}

const SingleUntilCard: React.FC<SingleUntilCardProps> = ({
  singleUnit,
  singleUser,
}) => {
  const { _id, unit, topic, points, progress, totalLessons } = singleUnit;

  const bengaliToEnglishMap: { [key: string]: string } = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };

  const convertBengaliToEnglish = (num: string) =>
    num.split("").map(digit => bengaliToEnglishMap[digit] || digit).join("");

  const progressInEnglish = progress ? convertBengaliToEnglish(progress) : "0";

  const isDisabled = singleUser?.unit?.includes(unit);

  return (
    <div
      className={`w-full rounded-md p-6 text-gray-300 relative flex flex-col ${
        isDisabled ? "opacity-100" : "opacity-50"
      }`}
      style={{
        backgroundImage: `url(${cardBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-2xl font-bold mb-2">{unit}</h1>
      <h4 className="text-xl font-semibold">{topic}</h4>
      <div className="flex col-3"></div>
      <div className="downDiv">
        <div className="flex gap-8 text-base my-2">
          <p>পাঠ: {totalLessons}</p>
          <p>পয়েন্টস: {points}</p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold">আপনার অগ্রগতি:</h3>
          <div className="mt-1">
            <div className="relative">
              <div className="h-6 bg-gray-200 w-full rounded-full">
                <p
                  style={{ width: `${progressInEnglish}%` }}
                  className="h-full bg-teal-500 text-white text-center rounded-full"
                >
                  {progress}%
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Link to={`/user-dashboard/learning/${_id}`}>
            <button
              disabled={!isDisabled}
              className={"defaultBtn flex items-center"}
            >
              শুরু করুন
              {isDisabled ? (
                <FaUnlock style={{ fontSize: "20px" }} />
              ) : (
                <FaLock style={{ fontSize: "20px", color: "#00FFCA" }} />
              )}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleUntilCard;
