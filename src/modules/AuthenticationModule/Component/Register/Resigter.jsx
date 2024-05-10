import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import img1 from "../../../../assets/4 3.png";

export default function Resigter() {
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const handleToggle = (e) => {
    e.preventDefault();
  };

  async function onSubmit(data) {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Register",
        data
      );
      toast.success("Account created successfully. A verification code has been sent to your email address.", {
        position: "top-right",
      });
      Navigate("/VerifyPass");
      console.log(response?.data?.message);
    } catch (error) {
      toast.error(
        error
          ? error?.response?.data?.message
          : "there is an error , please try again"
      );
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
                    <h4>Register</h4>
                    <p className="text-muted">
                      Welcome back ! please enter your details
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                <i className="fa-regular fa-user"></i>
                              </span>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="User Name"
                                {...register("userName", {
                                  required: "User Name is required",
                                  pattern: {
                                    value: /^[a-zA-Z]+[0-9]+$/,
                                    message: "Username must contain characters and end with numbers without spaces."
                                  },
                                  maxLength: {
                                    value: 8,
                                    message: "Username cannot exceed 8 characters."
                                  }
                                })}
                                
                              />
                            </div>
                            {errors.userName ? (
                              <p className="alert alert-danger">
                                {errors.userName.message}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-md-6">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                <i className="fa-regular fa-envelope"></i>
                              </span>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="E-mail"
                                {...register("email", {
                                  required: "Email is required",
                                  pattern: {
                                    value:-
                                      /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
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
                          </div>
                          <div className="col-md-6">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                <i className="fa-solid fa-earth-americas"></i>
                              </span>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="country"
                                {...register("country", {
                                  required: "country is required",
                                })}
                              />
                            </div>
                            {errors.country ? (
                              <p className="alert alert-danger">
                                {errors.country.message}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-md-6">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                <i className="fa-solid fa-phone"></i>
                              </span>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Phone Number"
                                {...register("phoneNumber", {
                                  required: "phoneNumber is required",
                                  pattern: {
                                    value: /^(01)(0|1|2|5)\d{8}$/,
                                    message: "Invalid Egyptian phone number",
                                  },
                                })}
                              />
                            </div>
                            {errors.phoneNumber ? (
                              <p className="alert alert-danger">
                                {errors.phoneNumber.message}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-md-6">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                <i className="fa-solid fa-key"></i>
                              </span>
                              <input
                                type={showPassword ? "text" : "password"}
                                className="form-control position-relative z-0"
                                placeholder="Password"
                                onClick={handleToggle}
                                {...register("password", {
                                  required: "password is required",
                                  pattern: {
                                    value:
                                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=|\\{}[\]:;<>,.?/~]).{6,}$/,
                                    message:
                                      "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long",
                                  },
                                })}
                              />
                              <a
                                onClick={() =>
                                  togglePasswordVisibility("password")
                                }
                              >
                                {showPassword ? (
                                  <i className="fa-solid fa-eye-slash position-absolute z-4"></i>
                                ) : (
                                  <i className="fa-regular fa-eye position-absolute z-4"></i>
                                )}
                              </a>
                            </div>
                            {errors.password ? (
                              <p className="alert alert-danger">
                                {errors.password.message}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-md-6">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                <i className="fa-solid fa-key"></i>
                              </span>
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                onClick={handleToggle}
                                className="form-control position-relative z-0"
                                placeholder="confirm Password"
                                {...register("confirmPassword", {
                                  required: "Confirm Password is required",
                                  validate: (value) =>
                                    value === watch("password") ||
                                    "the passwords dont match ",
                                })}
                              />
                              <a
                                onClick={() =>
                                  togglePasswordVisibility("confirmPassword")
                                }
                              >
                                {showConfirmPassword ? (
                                  <i className="fa-solid fa-eye-slash position-absolute z-4"></i>
                                ) : (
                                  <i className="fa-regular fa-eye position-absolute z-4"></i>
                                )}
                              </a>
                            </div>
                            {errors.confirmPassword ? (
                              <p className="alert alert-danger">
                                {errors.confirmPassword.message}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>

                      <button className="btn btn-success w-100 my-3">
                        Register
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
