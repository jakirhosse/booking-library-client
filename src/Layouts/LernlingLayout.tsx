
import { NavLink, Outlet } from "react-router-dom";
import {
  FcHome,
  FcReadingEbook,
  FcBusinessman,
  FcReading,
  FcTodoList,
  FcIdea,
} from "react-icons/fc";
import { HiOutlineMenu } from "react-icons/hi";
import DashboardTop from "../pages/shared/DashboardTop/DashboardTop";

const LernlingLayout = () => {
  return (
    <div className=" mx-auto drawer lg:drawer-open  ">
      {/*background blur color */}

      <div className=" -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
        <div
          className="w-1/2 h-full max-w-5xl mx-0 rounded-3xl opacity-10 blur-lg filter"
          style={{
            background:
              "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
          }}
        ></div>
      </div>

      {/* <input id="my-drawer-2" type="checkbox" className="drawer-toggle" /> */}
      <div className="flex ">
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        {/* <ul className="w-64 bg-gradient-to-b h-screen  from-[#0A4D68] to-[#088395] text-white py-3"> */}
        {/* <ul className="w-64 bg-gradient-to-b h-screen  from-[#0A4D68] to-[#088395] text-white py-3"> */}
        <ul className="w-64 bg-gradient-to-b h-screen text-black bg-gray-100 ">
         <DashboardTop></DashboardTop>
          <li className="px-5 py-1 transition duration-300 mt-2">
            <NavLink
              to="/user-dashboard/learning"
              className="flex gap-2 items-center"
            >
              <FcReading
                style={{
                  fontSize: "35px",
                  background: "white",
                  padding: "5px",
                  borderRadius: "50%",
                }}
              />
              শিখুন
            </NavLink>
          </li>

          <li className="px-5 py-1 transition duration-300 mt-2">
            <NavLink
              to="/user-dashboard/quiz"
              className="flex gap-2 items-center"
            >
              <FcIdea
                style={{
                  fontSize: "35px",
                  background: "white",
                  padding: "5px",
                  borderRadius: "50%",
                }}
              />
              প্র্যাকটিস
            </NavLink>
          </li>
          <li className="px-5 py-1 transition duration-300 mt-2">
            <NavLink
              to="/user-dashboard/grammar"
              className="flex gap-2 items-center"
            >
              <FcReadingEbook
                style={{
                  fontSize: "35px",
                  background: "white",
                  padding: "5px",
                  borderRadius: "50%",
                }}
              />
              গ্রামার
            </NavLink>
          </li>

          <li className="px-5 py-1 hover::bg-[#DDF4FF] transition duration-300 mt-2">
            <NavLink
              to="/user-dashboard/books-buy"
              className=" flex gap-2 items-center"
            >
              <FcReadingEbook
                style={{
                  fontSize: "35px",
                  background: "white",
                  padding: "5px",
                  borderRadius: "50%",
                }}
              />
              বই কিনুন
            </NavLink>
          </li>
          <li className="px-5 py-1 hover::bg-[#DDF4FF] transition duration-300 mt-2">
            <NavLink
              to="/user-dashboard/leader-board"
              className=" flex gap-2 items-center"
            >
              <FcTodoList
                style={{
                  fontSize: "35px",
                  background: "white",
                  padding: "5px",
                  borderRadius: "50%",
                }}
              />
              লিডারবোর্ড
            </NavLink>
          </li>

          <li className="px-5 py-1 hover::bg-[#DDF4FF] transition duration-300 mt-2">
            <NavLink
              to="/user-dashboard/coin-buy"
              className=" flex gap-2 items-center"
            >
              <FcReadingEbook style={{ fontSize: "30px" }} />
              কয়েন কিনুন
            </NavLink>
          </li>
          <li className="px-5 py-1 hover::bg-[#DDF4FF] transition duration-300 mt-4">
            <NavLink
              to="/user-dashboard/profile"
              className=" flex gap-2 items-center"
            >
              <FcBusinessman
                style={{
                  fontSize: "35px",
                  background: "white",
                  padding: "5px",
                  borderRadius: "50%",
                }}
              />
              প্রোফাইল
            </NavLink>
          </li>

          <li className="px-5 py-1 hover::bg-[#DDF4FF] transition duration-300 mt-2">
            <NavLink to="/" className=" flex gap-2 items-center">
              <FcHome
                style={{
                  fontSize: "35px",
                  background: "white",
                  padding: "5px",
                  borderRadius: "50%",
                }}
              />
              হোম পেজ
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          <HiOutlineMenu style={{ fontSize: "20px" }} />
        </label>
        <Outlet></Outlet>
      </div>
      </div>
    </div>
  );
};

export default LernlingLayout;