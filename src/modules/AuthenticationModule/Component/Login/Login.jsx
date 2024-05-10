import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img1 from "../../../../assets/4 3.png";
export default function Login(SaveLoginData) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  async function onSubmit(data) {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data
      );
      toast.success("Login successfully!");
        Navigate("/Dashboard");
      localStorage.setItem("token", response.data.token);
      SaveLoginData(); 
    } catch (error) {
      toast.error(error ? error?.response?.data?.message :'there is an error , please try again');
    }
  }

  return (
    <>
      <div className="Auth-Bg">
        <div className="overlay">
          <div className="container">
            <div className="row vh-100 justify-content-center align-items-center">
              <div className="col-md-6 bg-white rounded-2 p-3">
                <div>
                  <div className="text-center my-2">
                    <img src={img1} alt="" className="w-50" />
                  </div>
                  <div className="container">
                    <h4>Login</h4>
                    <p className="text-muted">
                      Welcome Back !Please enter your details
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa-solid fa-envelope"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Please , enter your email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                              message: "Invalid Email",
                            },
                          })}
                        />
                      </div>
                      {errors.email ? (
                        <p className="alert alert-danger">
                          {errors.email.message}
                        </p>
                      ) : (
                        ""
                      )}

                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa-solid fa-key"></i>
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control posiotion-relative z-0"
                          placeholder="Please , enter your Password"
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message: "Password must be at least 6 characters",
                            },
                          })}
                        />
                        <a onClick={togglePasswordVisibility}>
        {showPassword ? 
          <i className="fa-solid fa-eye-slash position-absolute z-4 "></i>
          :<i className="fa-regular fa-eye position-absolute z-4"></i>}
      </a>
                      </div>
                      {errors.password ? (
                        <p className="alert alert-danger">
                          {errors.password.message}
                        </p>
                      ) : (
                        ""
                      )}
                      <div className="links d-flex justify-content-between">
                        <Link to="/Register" className="text-decoration-none text-black">
                          Register now
                        </Link>
                        <Link
                          to="/Forgetpass"
                          className="text-decoration-none text-muted"
                        >
                          Forget Password ?
                        </Link>
                      </div>
                      <button className="btn btn-success w-100 my-3">
                        Login
                      </button>
                    </form>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
