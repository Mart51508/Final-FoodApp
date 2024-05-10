import img1 from "../../../../assets/4 3.png";
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { toast} from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Resetpass() {

  const Navigate=  useNavigate()
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };


const {handleSubmit , register , formState:{errors} ,watch } = useForm()

  async function onSubmit(data){
   try {
    const response= await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset' , data)
   toast.success("Password has been updated successfully", {
    position: "top-right",
  });
    Navigate('/')
  
   } catch (error) {
    toast.error(error? error?.response?.data?.message :'there is an error , please try again');
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
              <h4>Forget Your Password</h4>
              <p className="text-muted">
                Please enter your OTP or check Your Inbox
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    {...register('email' , {required:'Email is required' , pattern:{
                      value : /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                      message:'Invalid Email'
                    }} )}
                  />
                  
                </div>
                {errors.email ? <p className="alert alert-danger">{errors.email.message}</p> :''}

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-key"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="OTP"
                    {...register('seed' , {required:'OTP is required' ,maxLength: {
                      value:4 ,
                      message: "OTP must be 4 only"} ,minLength: {
                        value:4 ,
                        message: "OTP must be 4 only"},} )}
                  />
                  
                </div>
                {errors.seed ? <p className="alert alert-danger">{errors.seed.message}</p> :''}

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-key"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control position- z-0"
                    placeholder="Password"
                    {...register("password", {
                      required: "password is required",
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=|\\{}[\]:;<>,.?/~]).{6,}$/ ,
                        message: "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long",
                      },
                    })}
                  />
                    <a onClick={() => togglePasswordVisibility('password')}>
      {showPassword ? (
        <i className="fa-solid fa-eye-slash position-absolute z-4"></i>
      ) : (
        <i className="fa-regular fa-eye position-absolute z-4"></i>
      )}
    </a>
                </div>
                {errors.password ? <p className="alert alert-danger">{errors.password.message}</p> :''}

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-key"></i>
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    
                    className="form-control position-relative"
                    
                    placeholder="confirm Password"
                    {...register('confirmPassword',{
                      required :'Confirm Password is required' , 
                      validate:(value) => value === watch('password') || 'the passwords dont match '
                    })}
                  />
                   <a onClick={() => togglePasswordVisibility('confirmPassword')}>
      {showConfirmPassword ? (
        <i className="fa-solid fa-eye-slash position-absolute"></i>
      ) : (
        <i className="fa-regular fa-eye position-absolute"></i>
      )}
    </a>
                </div>
                {errors.confirmPassword ? <p className="alert alert-danger">{errors.confirmPassword.message}</p> :''}
                <button className="btn btn-success w-100 my-3">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</>
  )
}
