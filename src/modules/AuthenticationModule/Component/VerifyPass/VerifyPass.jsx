import axios from 'axios';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import img1 from "../../../../assets/4 3.png";

function VerifyPass() {

    const {handleSubmit , register , formState:{errors}} = useForm()
   

const Navigate=useNavigate()

async function onSubmit(data){
 try {
  const response= await axios.put('https://upskilling-egypt.com:3006/api/v1/Users/verify' , data)
 toast.success("Account verified successfully", {
  position: "top-right",
});
  Navigate('/')

console.log(response?.data?.message);
 } catch (error) {
  toast.error( error ?error?.response?.data?.message:'there is an error , please try again');
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
                  <h4>Verify your password</h4>
                  <p className="text-muted">
                    No Worries !Please enter your email and we will send a password rest link
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
                        {...register('email' , {required:'Email is required' , pattern:{
                          value : /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                          message:'Invalid Email'
                        }} )}
                      />
                      
                    </div>
                    {errors.email ? <p className="alert alert-danger">{errors.email.message}</p> :''}

                        
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                <i className="fa-solid fa-key"></i>
                              </span>
                              <input
                                type= 'text'
                                className="form-control position-relative"
                                placeholder="code"
                                {...register("code", {
                                  required: "Code is required",
                                })}
                              />
                            
                            </div>
                          
                          
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

export default VerifyPass
