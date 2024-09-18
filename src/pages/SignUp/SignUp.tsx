import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import GoogleFb from "../shared/GoogleFb/GoogleFb";
import registerImg from "../../../public/register.svg";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: FileList;
  phoneNumber: string;
}

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const authContext = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const [axiosSecure] = useAxiosSecure();
  const from = location.state?.from?.pathname || "/";

  // Check if authContext is null
  if (!authContext) {
    return <div>Loading...</div>; // Handle the loading or null context case
  }

  const { createUserEmail, updateUserProfile } = authContext;

  const onSubmit = async (data: FormData) => {
    const { name, email, password, confirmPassword, image, phoneNumber } = data;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("image", image[0]);

    const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      const imageUrl = result?.data?.display_url;

      createUserEmail(email, password)
        .then(() => {
          // Save user data to the database
          const saveUser = {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            image: imageUrl,
            score: 0,
            role: "user",
            unit: ["1"],
          };

          axiosSecure.post("/users/user", saveUser)
            .then(() => {
              alert("Account creation successful!");
              navigate("/Login");
            })
            .catch((error) => {
              if (error.response) {
                alert(`Error: ${error.response.data.message}`);
              } else if (error.request) {
                alert("No response received from the server.");
              } else {
                alert(`Error: ${error.message}`);
              }
            });

          // Update user profile
          updateUserProfile(name, imageUrl)
            .then(() => {
              navigate(from, { replace: true });
            })
            .catch((err: any) => {
              setError(err.message);
            });

          setError(null);
          reset();
        })
        .catch((err: any) => {
          setError(err.message);
        });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign up page</title>
      </Helmet>
      <div className="my-10">
        <div className="hero-content mx-auto flex lg:flex-row gap-10">
          <div className="hidden md:block">
            <img className="w-1/2" src={registerImg} alt="Register" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
            <h1 className="text-4xl font-bold pb-0 mb-0 fontKalam">
              Create your account
            </h1>
            <p className="font-semibold text-xl fontKalam mb-4">
              Have an Account?
              <Link to="/login" className="text-[#407bff] ml-1 hover:underline">
                Login
              </Link>
            </p>
            <GoogleFb />
            <div className="card bg-base-300 rounded-box grid h-20 place-items-center">or</div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body w-full bg-white p-6 rounded shadow-md"
            >
              {/* Name Input */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered w-full p-2 border rounded"
                  {...register("name", { required: "This field is required" })}
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>

              {/* Email and Phone Number */}
              <div className="lg:flex gap-5">
                <div className="form-control w-full mb-4">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    className="input input-bordered w-full p-2 border rounded"
                    {...register("email", { required: "This field is required" })}
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>
                <div className="form-control w-full mb-4">
                  <label className="label">
                    <span className="label-text">Phone</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Phone Number"
                    className="input input-bordered w-full p-2 border rounded"
                    {...register("phoneNumber", { required: "This field is required" })}
                  />
                  {errors.phoneNumber && (
                    <span className="text-red-500">{errors.phoneNumber.message}</span>
                  )}
                </div>
              </div>

              {/* Photo Input */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="file"
                  placeholder="Photo"
                  className="input input-bordered w-full pt-2"
                  accept="image/*"
                  {...register("image")}
                />
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

              {/* Confirm Password Input */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="input input-bordered w-full p-2 border rounded"
                  {...register("confirmPassword", { required: "This field is required" })}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500">{errors.confirmPassword.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary w-full py-3 font-bold rounded"
                >
                  Register
                </button>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
