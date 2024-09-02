import { Helmet } from "react-helmet-async";
import Lesson from "../Lessons/Lesson";
import Faq from "../Faq/Faq";
import Testimonial from "../Testimonial/Testimonial";
import HomepageBlog from "../HomepageBlog/HomepageBlog";
import LearnLanguage from "../LearnLanguage/LearnLanguage";
import Cover from "../Cover/Cover";
import BookSection from "../BookSection/BookSection";
import Contact from "../Contact/Contact";


const Home = () => {
        return (
                <div>
                      <Helmet><title>Book | Home page</title></Helmet>
                      <Cover></Cover>
                     <div className="md:w-10/12 mx-auto w-11/12">
                     <Lesson></Lesson>
                     </div>
                     {/* overview  */}
                     <div className="md:w-10/12 mx-auto w-11/12">
                     <LearnLanguage></LearnLanguage>
                     <HomepageBlog></HomepageBlog>
                     <BookSection></BookSection>
                     <Faq></Faq>
                     <Testimonial></Testimonial>  
                     <Contact></Contact>
                     </div>
                </div>
        );
};

export default Home;