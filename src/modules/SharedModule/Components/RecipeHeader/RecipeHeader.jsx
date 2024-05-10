import React from "react";
import { useNavigate } from "react-router-dom";

function RecipeHeader() {

   const Navigate = useNavigate()
    function backtoRecipes(){
        Navigate('/Dashboard/Recipes')
      }
  return (
    <>
      <div className="container-fluid header-recipe p-5 my-3">
        <div className="row  justify-content-between align-items-center">
          <div className="col-md-10">
            <div className="text">
              <h4>
                Fill the <span className="text-success fs-4">Recipe</span>
              </h4>
              <p>
                you can now fill the meals easily using the table anf form ,
                click here and still it with the table !
              </p>
            </div>
          </div>
          <div className="col-md-2">
              <button onClick={backtoRecipes} className="btn btn-success">
                Add Recipe <i className="fa-solid fa-arrow-right ms-2"></i>
              </button>
            </div>
        </div>
      </div>
    </>
  );
}

export default RecipeHeader;
