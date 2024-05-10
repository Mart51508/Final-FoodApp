import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import { useNavigate } from "react-router-dom";

function Favorite() {
  let [FavArray, setFavArray] = useState([]);
  const [User, setUser] = useState(null);
  const [isActive, setIsActive] = useState(false);

  
const Navigate =useNavigate()
  const handleClick = () => {
    setIsActive(!false);
  };

  async function GetFavorite() {
    try {
      let res = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setFavArray(res?.data?.data);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  async function DeleteFav(id) {
    try {
      const res = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      console.log(res);
      handleClick();
      GetFavorite();
      toast.success("you favorite recipe deleted successfully");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetFavorite();
    let userinfo =JSON.parse(localStorage.getItem('UserData'))
    setUser(userinfo)
    if(userinfo?.userGroup === 'SuperAdmin'){
      Navigate('/')
    }
  }, []);
  return (
    <>
   <div className="container">
        <div className="row">
          {FavArray?.length > 0 ? (
            FavArray.map((items) => (
              <>
                <div className="col-md-3">
                  <div key={items.id} className="card border-0 shadow-sm my-3">
                    <img
                      className="w-100 rounded-start-2 rounded-end-2"
                      src={
                        "https://upskilling-egypt.com:3006/" +
                        items.recipe.imagePath
                      }
                      alt=""
                      style={{ height: "175px" }}
                    />
                    <div className="p-2 bg-body-tertiary">
                      <h3>{items.recipe.name}</h3>
                      <p>{items.recipe.description}</p>
                      <div className="d-flex justify-content-between ">
                        <p>{items.recipe.price}</p>
                        {/* <i   className="fa-regular fa-heart"></i> */}
                        <button
                          className="border-0 bg-transparent"
                          onClick={() => {
                            DeleteFav(items.recipe.id);
                          }}
                        >
                          {" "}
                          {isActive ? (
                            <i
                              className="fas fa-heart"
                              style={{ color: "red" }}
                            ></i> // Filled heart icon
                          ) : (
                            <i
                              className="far fa-heart"
                              style={{ color: "black" }}
                            ></i> // Outlined heart icon
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))
          ) : (
            <div className="text-center">
              <NoData />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Favorite;
