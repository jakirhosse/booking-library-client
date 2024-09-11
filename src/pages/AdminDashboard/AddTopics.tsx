import { Helmet } from "react-helmet-async";
import AddTopicData from "./AddTopicData";


const AddTopics = () => {
        return (
               <>
                <Helmet> <title>Book add| Topic</title></Helmet>
                <div className="p-4 py-8 lg:w-11/12">
                <AddTopicData />
              </div>
               </>
        );
};

export default AddTopics;