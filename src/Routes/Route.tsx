import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import AboutUs from "../pages/Aboutus/AboutUs";
import Home from "../pages/Home/Home/Home";
import Faq from "../pages/Faq/Faq";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import SingleBlogCard from "../pages/Blogs/SingleBlogCard";
import Blogs from "../pages/Blogs/Blogs";
import LernlingLayout from "../Layouts/LernlingLayout";
import AdminDashboardLayout from "../Layouts/AdminDashboardLayout";
import Learning from "../pages/UserDashboard/Learning/Learning";
import LearnLesson from "../pages/UserDashboard/LearnLesson/LearnLesson";
import LeaderBoard from "../pages/UserDashboard/LeaderBoard/LeaderBoard";
import QuizLevel from "../pages/UserDashboard/Quiz/QuizLevel";
import Quizzes from "../pages/UserDashboard/Quiz/Quizzes";
import Grammar from "../pages/UserDashboard/Grammer/Grammar";
import Books from "../pages/UserDashboard/Books/Books";
import BoughtBooks from "../pages/UserDashboard/BoughtBooks/BoughtBooks";
import Shop from "../pages/UserDashboard/Shop/Shop";
import Profile from "../pages/UserDashboard/Profile/Profile";
import Statistics from "../pages/AdminDashboard/Statistics/Statistics";
import UserManage from "../pages/AdminDashboard/UserManage/UserManage";
import AddUnit from "../pages/AdminDashboard/AddUnit/AddUnit";


const router = createBrowserRouter ([
     {
        path:"/",
        element:<Main></Main>,
        children:[
                {
                        path:"/",
                        element:<Home></Home>
                        
                },
                {
                        path:"/about-us",
                        element:<AboutUs></AboutUs>
                },
                {
                        path:"/faq",
                        element:<Faq></Faq>
                },
                {
                        path:"/Login",
                        element:<Login></Login>
                },
                {
                        path:"/signUp",
                        element:<SignUp></SignUp>
                },
                {
                        path:"/singleBlogCard/:id",
                        element:<SingleBlogCard></SingleBlogCard>
                },
                {
                        path:"/blog",
                        element:<Blogs></Blogs>
                }
        ]
     },

      // user dashborad  \\\------------------------------  
      {
        path:"user-dashboard",
        element:(
                <LernlingLayout></LernlingLayout>
        ),
        children:[
                {
                      path:"learning",
                      element:(
                        <Learning></Learning>
                      ),
                },
                {
                        path:"learning/:id",
                        element:(
                                <LearnLesson></LearnLesson>
                        )
                },
                {
                        path: "leader-board",
                       element:(
                        <LeaderBoard></LeaderBoard>
                       )
                      },

                      {
                        path: "quiz",
                        element: (
                          <QuizLevel></QuizLevel>
                        ),
                      },
                      {
                        path: "mainquiz/:id",
                        element: <Quizzes></Quizzes>,
                        loader: ({ params }) =>
                          fetch(`http://localhost:5000/quizs/quizs/${params.id}`)
                      },

                      {
                        path: "grammar",
                        element: (
                         <Grammar></Grammar>
                        ),
                      },

                      {
                        path: "books-buy",
                        element: (
                        <Books></Books>
                        ),
                      },

                      {
                        path: "bought-books",
                        element: (
                       <BoughtBooks></BoughtBooks>
                        ),
                      },
                      { 
                        path: "shop",
                        element: (
                      <Shop></Shop>
                        ),
                      },

                      {    
                        path: "coin-buy",
                        element: (
                      <Shop></Shop>
                        ),
                      },

                      {    
                        path: "profile",
                        element: (
                    <Profile></Profile>
                        ),
                      },
        ]
       },
 

//        user adminnn/////  --------------------------------  

{
        path: "admin-dashboard",
        element: (
          <AdminDashboardLayout></AdminDashboardLayout>
        ),
        children: [
          {
            path: "statistics",
         element:(
          <Statistics></Statistics>
         )
          },

          {
            path: "user-manage",
            element: (
             <UserManage></UserManage>
            ),
          },
          {
            path: "add-unit",
            element: (
            <AddUnit></AddUnit>
            ),
          },
        ]
        }
])
export default router;


