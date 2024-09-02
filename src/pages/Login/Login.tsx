import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToast from "../../Hook/useToast";
import { Helmet } from "react-helmet-async";
import registerImg from '../../../public/register.svg'
import GoogleFb from "../shared/GoogleFb/GoogleFb";
import { Toaster } from "react-hot-toast";
interface FormData {
        email: string;
        password: string;
      }
    
const Login:React.FC = () => {

        const {
                register, handleSubmit, formState: { errors }, } = useForm<FormData>();
              const {loginUser}:any = useContext(AuthContext)
              const navigate = useNavigate();
                const location = useLocation();
  // toaster message
  const [successAlert, errorAlert] = useToast();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data: FormData) => {
        loginUser(data.email, data.password)
          .then(() => {
            navigate(from, { replace: true });
            successAlert("login successfull");
          })
          .catch((err: any) => {
            errorAlert(err.message);
          });
      };
        return (
               <>
               <Helmet><title>Login page</title></Helmet>
               <div className="my-10">
        <Toaster />
      </div>
      <div className="my-10">
  <div className="hero-content mx-auto flex lg:flex-row gap-10">
    {/* Image Section */}
    <div className="hidden md:block">
      <img
        className="w-1/2"
        src={registerImg} // Replace with your login image source
        alt="Login"
      />
    </div>

    {/* Login Form Section */}
    <div className="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
     <div className="mx-auto">
     <h1 className="text-4xl font-bold mx-auto fontKalam">Login to your account</h1>
      <p className="font-semibold text-xl fontKalam mb-4">
        Don't have an account?
        <Link to="/signUp" className="text-[#407bff] ml-1 hover:underline">
          Sign Up
        </Link>
      </p>
     </div>
     <GoogleFb />
      <div className="card bg-base-300 rounded-box grid h-20 place-items-center">or</div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body p-0 w-full">
        {/* Email Input */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered w-full p-2 border rounded"
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        {/* Password Input */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full p-2 border rounded"
            {...register("password", { required: "This field is required" })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-control">
          <button type="submit" className="defaultBtn w-full mt-6">
            Login
          </button>
          {/* {error && <span className="text-red-500 text-xs">this </span>} */}
        </div>
      </form>
    </div>
  </div>
</div>

               </>
        );
};

export default Login;