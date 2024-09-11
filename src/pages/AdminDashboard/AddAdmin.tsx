import { Helmet } from "react-helmet-async";
import AddCategoryQuiz from "./AddCategoryQuiz";

const AddAdmin:React.FC = () => {
        return (
                <>
                <Helmet>
                  <title> Add Quiz| Admin Dashboard | Lang Master </title>
                </Helmet>
                <div>
                  <AddCategoryQuiz />
                </div>
              </>
        );
};
export default AddAdmin;