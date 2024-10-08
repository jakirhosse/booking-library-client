import shape3 from '../../../../public/shape-3.svg';
import Aos from "aos";
import { useEffect } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { BsFillCartCheckFill, BsPatchQuestionFill } from 'react-icons/bs';
import { RiLoginCircleFill } from 'react-icons/ri';
import { PiBooksThin } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const Faq = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="my-20">
      <SectionTitle titleLetter="FAQ" titleWord="Corner"></SectionTitle>
      <div className="flex md:flex-row flex-col-reverse items-center justify-between gap-20 mt-14">
        <div
          className="md:w-1/2 p-4"
          data-aos="fade-zoom-in"
          data-aos-duration="1000"
        >
          <h1 className="text-5xl font-bold text-red-300">
            Do You Have Any Questions?
          </h1>
          <p className="my-4">
            Quick Answers to Common Queries. Get instant solutions to frequently
            asked questions. Find helpful information on a variety of topics to
            enhance your experience.
          </p>
          <div className="grid grid-cols-2 gap-5 mb-6">
            <div className="md:flex items-center gap-3 font-medium text-xl p-3 bg-indigo-100 drop-shadow-lg hover:skew-y-6 duration-500">
              <BsPatchQuestionFill className="text-red-400" />
              <p>How to start?</p>
            </div>
            <div className="md:flex items-center gap-3 text-xl p-3 bg-indigo-100 drop-shadow-lg hover:skew-y-6 font-medium duration-500">
              <RiLoginCircleFill className="text-blue-400" />
              <p>Want To Login?</p>
            </div>
            <div className="md:flex items-center gap-3 drop-shadow-lg text-xl font-medium p-3 bg-indigo-100 hover:skew-y-6 duration-500">
              <BsFillCartCheckFill className="text-indigo-600 text-xl" />
              <p>How to Buy Books?</p>
            </div>
            <div className="md:flex items-center gap-3 font-medium text-xl p-3 bg-indigo-100 drop-shadow-lg hover:skew-y-6 duration-500">
              <PiBooksThin className="text-red-300" />
              <p>Can't Buy Books?</p>
            </div>
          </div>
          <Link to="/faq">
            <button className="defaultBtn">Know More</button>
          </Link>
        </div>
        <div
          className="md:w-1/2 relative bg-[#fca5a58d]"
          style={{ borderRadius: "50% 50% 50% 50% / 70% 70% 40% 40%" }}
          data-aos="fade-zoom-in"
          data-aos-duration="1000"
        >
          <img
            className="w-full h-full"
            src="https://i.ibb.co/j5r61ng/transform-img.png"
            alt="faq-img"
          />
        </div>
        <div className="animate-updown hidden md:block absolute bottom-40 left-[70%] h-20 w-20 opacity-100">
          <img src="https://i.ibb.co/b5NznY3/footer-shape-2.png" alt="shape"/>
        </div>
        <div className="animate-pulse ease-in-out duration-[20000ms] hidden md:block absolute bottom-32 left-[10%] h-20 w-20 opacity-80">
          <img src={shape3} alt="shape"/>
        </div>
        <div className="animate-updown hidden md:block absolute top-20 left-[50%] h-20 w-20 opacity-80">
          <img src="https://i.ibb.co/gd8K550/footer-shape-1.png" alt="shape"/>
        </div>
      </div>
    </div>
  );
};

export default Faq;
