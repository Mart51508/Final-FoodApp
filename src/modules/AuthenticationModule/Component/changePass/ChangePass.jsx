import axios from "axios";
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import img1 from "../../../../assets/4 3.png";

function ChangePass() {
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
  
    async function onSubmit(data) {
      try {
        const response = await axios.put(
          "https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword",
          data,{
            headers :{Authorization :`Bearer ${localStorage.getItem('token')}`}
          });
        toast.success("Password has been updated successfully", {
          position: "top-right",
        });
        Navigate("/");
      } catch (error) {
        toast.error(
          error
            ? error?.response?.data?.message
            : "there is an error , please try again"
        );
      }
    }
    let Navigate = useNavigate();
    const [IsCollapsing, setIsCollapsing] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

    return (
        <>
          <div className="container">
          <div className="text-center my-2">
                    <img src={img1} alt="" className="w-50" />
                  </div>
            <h4>Change your password</h4>
            <p className="text-muted">Please enter your details below</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-key"></i>
                </span>
                <input
                   type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="oldPassword"
                  {...register("oldPassword", {
                    required: "Old Password is required",
                  })}
                />
                 <a onClick={() => togglePasswordVisibility("password")}>
                  {showPassword ? (
                    <i className="fa-solid fa-eye-slash position-absolute"></i>
                  ) : (
                    <i className="fa-regular fa-eye position-absolute"></i>
                  )}
                </a>
              </div>
              {errors.oldPassword ? (
                <p className="alert alert-danger">
                  {errors.oldPassword.message}
                </p>
              ) : (
                ""
              )}

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-key"></i>
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control position-relative"
                  placeholder="New Password"
                  {...register("newPassword", {
                    required: "newPassword is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=|\\{}[\]:;<>,.?/~]).{6,}$/,
                      message:
                        "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long",
                    },
                  })}
                />
               
                <a onClick={() => togglePasswordVisibility("confirmPassword")}>
                  {showConfirmPassword ? (
                    <i className="fa-solid fa-eye-slash position-absolute"></i>
                  ) : (
                    <i className="fa-regular fa-eye position-absolute"></i>
                  )}
                </a>
              </div>
              {errors.newPassword ? (
                <p className="alert alert-danger">
                  {errors.newPassword.message}
                </p>
              ) : (
                ""
              )}

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-key"></i>
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control position-relative"
                  placeholder="Confirm New Password"
                  {...register("confirmNewPassword", {
                    required: "confirm New Password is required",
                    validate: (value) =>
                      value === watch("newPassword") ||
                      "the passwords dont match ",
                  })}
                />
                <a onClick={() => togglePasswordVisibility("confirmPassword")}>
                  {showConfirmPassword ? (
                    <i className="fa-solid fa-eye-slash position-absolute"></i>
                  ) : (
                    <i className="fa-regular fa-eye position-absolute"></i>
                  )}
                </a>
              </div>
              {errors.confirmNewPassword ? (
                <p className="alert alert-danger">
                  {errors.confirmNewPassword.message}
                </p>
              ) : (
                ""
              )}
              <button className="btn btn-success w-100 my-3">Submit</button>
            </form>
          </div>
        </>
    )
}

export default ChangePass
