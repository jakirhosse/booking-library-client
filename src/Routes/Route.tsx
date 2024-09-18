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
import AllQuestion from "../pages/AdminDashboard/AllQuestion/AllQuestion";
import AddLesson from "../pages/AdminDashboard/AllQuestion/AddLesson";
import AddTopics from "../pages/AdminDashboard/AddTopics";
import AddAdmin from "../pages/AdminDashboard/AddAdmin";
import AllPayments from "../pages/AdminDashboard/AllPayments";
import AllBooks from "../pages/AdminDashboard/AllBooks";
import AllBuyBook from "../pages/AdminDashboard/AllBuyBook";
import AddBooks from "../pages/AdminDashboard/AddBooks";
import Introduction from "../pages/Introduction/Introduction";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndCondition from "../pages/TermsAndCondition/TermsAndCondition";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";


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
                  path: "/privacy-policy",
                  element:<PrivacyPolicy></PrivacyPolicy> ,
                },
                {
                  path: "/terms-and-condition",
                  element: <TermsAndCondition></TermsAndCondition>,
                },
                {
                  path:"/introduction",
                  element:<Introduction></Introduction>
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
                <PrivateRoute><LernlingLayout></LernlingLayout></PrivateRoute>
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
                              <PrivateRoute>  <LearnLesson></LearnLesson></PrivateRoute>
                        )
                },
                {
                        path: "leader-board",
                       element:(
                       <PrivateRoute> <LeaderBoard></LeaderBoard></PrivateRoute>
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
        <AdminRoute>
            <AdminDashboardLayout></AdminDashboardLayout>
        </AdminRoute>
        ),
        children: [
          {
            path: "statistics",
         element:(
         <AdminRoute>
           <AdminRoute><Statistics></Statistics></AdminRoute>
         </AdminRoute>
         )
          },

          {
            path: "user-manage",
            element: (
            <AdminRoute>
               <UserManage></UserManage>
            </AdminRoute>
            ),
          },

          {
            path: "add-quize",
            element: (
            <AdminRoute> <AddAdmin></AddAdmin></AdminRoute>
            ),
          },
          {
            path: "add-unit",
            element: (
           <AdminRoute> <AddUnit></AddUnit></AdminRoute>
            ),
          },

          {
            path: "update-question",
            element: (
            <AdminRoute> <AllQuestion></AllQuestion></AdminRoute>
            ),
          },

          {
            path: "add-topics",
            element: (
             <AdminRoute><AddTopics></AddTopics></AdminRoute>
            ),
          },

          {
            path: "allPayment",
            element: (
             <AllPayments></AllPayments>
            ),
          },
          {
            path: "all-bought-books",
            element: (
            <AdminRoute>  <AllBuyBook></AllBuyBook></AdminRoute>
            ),
          },
          {
            path: "allbooks",
            element: (
              <AdminRoute><AllBooks></AllBooks></AdminRoute>
            ),
          },

          {
            path: "addBook",
            element: (
            <AdminRoute> <AddBooks></AddBooks></AdminRoute>
            ),
          },
          {
            path: "add-lesson/:id",
            element: <AddLesson />,
            loader: async ({ params }) => {
              const response = await fetch(`http://localhost:5000/learning-questions/questions/${params.id}`);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
              return { data };
            },
          },
        ]
        }
])
export default router;


