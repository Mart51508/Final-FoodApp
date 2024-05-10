import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./modules/AuthenticationModule/Component/Login/Login";
import AuthLayout from "./modules/SharedModule/Components/AuthLayout/AuthLayout";
import MasterLayout from "./modules/SharedModule/Components/MasterLayout/MasterLayout";
import Resigter from "./modules/AuthenticationModule/Component/Register/Resigter";
import Resetpass from "./modules/AuthenticationModule/Component/Resetpass/Resetpass";
import Forgetpass from "./modules/AuthenticationModule/Component/Forgetpass/Forgetpass";
import NotFound from "./modules/SharedModule/Components/NotFound/NotFound";
import RecipesList from "./modules/RecipesModule/Component/RecipesList/RecipesList";
import Categories from "./modules/CategoriesModule/Components/Categories/Categories";
import UserList from "./modules/UserModule/Component/UserList/UserList";
import Home from "./modules/SharedModule/Components/Home/Home";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode'
import ProtectedRoute from "./modules/SharedModule/Components/ProtectedRoute/ProtectedRoute";
import RecipesForm from "./modules/RecipesModule/Component/RecipesForm/RecipesForm";
import VerifyPass from "./modules/AuthenticationModule/Component/VerifyPass/VerifyPass";
import Favorite from "./modules/FavoriteModule/Component/Favorite/Favorite";
import EditingPage from "./modules/RecipesModule/Component/editingPage/editingPage";
import ModalCategory from "./modules/SharedModule/Components/ModalCategory/ModalCategory";

function App() {
const [LoginData ,setLoginData] = useState(null)

let SaveLoginData = ()=>{
  let encodedData = localStorage.getItem('token')
  let decodedData = jwtDecode(encodedData)
  localStorage.setItem('UserData' , JSON.stringify(decodedData))
  setLoginData(decodedData)
}

useEffect(()=>{
 if(localStorage.getItem('token')){
  SaveLoginData()
 }
},[])

  const Routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout/>,
      errorElement:<NotFound/>,
      children: [{ path: "", element: <Login SaveLoginData={SaveLoginData}/> },
      { path: "Login", element: <Login SaveLoginData={SaveLoginData}/> },
      { path: "Register", element: <Resigter /> },
      { path: "ResetPass", element: <Resetpass /> },
      { path: "ForgetPass", element: <Forgetpass /> },
      { path: "VerifyPass", element: <VerifyPass/> }],
    },  {
      path: "Dashboard",
      element: <ProtectedRoute  ><MasterLayout LoginData={LoginData}/></ProtectedRoute>,
      errorElement:<NotFound/>,
      children: [
        { path: "Home", element: <Home/>},
        { index:true , element: <Home/>},
        { path: "Recipes", element: <RecipesList/>},
        { path: "RecipesForm", element: <RecipesForm/>},
        { path: "EditingPage/:id", element: <EditingPage/>},
        { path: "Categories", element: <Categories />},
        { path: "ModalCategory", element: <ModalCategory/>},
        { path: "Favorite", element: <Favorite LoginData={LoginData}/>},
        { path: "User", element: <UserList/>},
      ],
    },
  ]);

  return (
    <>
    <ToastContainer autoClose={1500} />
      <RouterProvider router={Routes} />
    </>
  );
}

export default App;
