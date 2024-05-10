import img1 from "../../../../assets/4 3.png";
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { toast} from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
import {useNavigate } from "react-router-dom";
export default function Forgetpass() {
const {handleSubmit , register , formState:{errors}} = useForm()

const Navigate=  useNavigate()

async function onSubmit(data){
 try {
  const response= await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request' , data)
 toast.success("Your request is being processed, please check your email", {
  position: "top-right",
});
  Navigate('/Resetpass')


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
                  <h4>Forget Your Password</h4>
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
