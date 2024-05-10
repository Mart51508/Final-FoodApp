import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import RecipeHeader from "../../../SharedModule/Components/RecipeHeader/RecipeHeader";

export default function EditRecipeData() {
  const [Recipe, setRecipe] = useState({});
  const [CategoriesList, setCategoriesList] = useState([]);
  const [TagList, setTagList] = useState([]);
  const Navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { id } = useParams();


  function AppendToFormData(data) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("tagId", data.tagId);
    formData.append("recipeImage", data.recipeImage[0]);
    return formData;
  }

  const getRecipe = async () => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setRecipe(response.data);
        reset({
            name: response.data.name,
            price: response.data.price,
            description: response.data.description,
            tag: response.data.tag,
            category: response.data.category[0].name,
            imagePath: response.data.imagePath,
          });
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data) => {
    let RecipeData = AppendToFormData(data);
    try {
      const response = await axios.put(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${id}`,
        RecipeData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
getRecipe()
      toast.success("Recipe Edited Successfully");
      Navigate("/DashBoard/RecipesList");
    } catch (err) {
      console.log(err);
    }
  };

  const getTagsAndCategories = async () => {
    try {
      const [tagsResponse, categoriesResponse] = await Promise.all([
        axios.get("https://upskilling-egypt.com:3006/api/v1/tag", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
        axios.get(
          "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        ),
      ]);

      setTagList(tagsResponse.data);
      setCategoriesList(categoriesResponse.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  function backtoRecipes() {
    Navigate("/Dashboard/RecipesList");
  }

  useEffect(() => {
    getTagsAndCategories();
    getRecipe();
  }, []);


  return (
    <>
      <RecipeHeader />
      <div className="p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                className="form-control my-3"
                placeholder="Recipe Name"
                id="RecipeName"
                {...register("name", {
                  required: "Name of Category is required",
                })}
              />
              {errors.name ? (
                <p className="alert alert-danger">{errors.name.message}</p>
              ) : (
                ""
              )}
              <select
                className="form-control my-3 text-muted"
                id="categoriesIds"
                {...register("tagId", { required: "tag ID is required" })}
              >
                <option value="">Select Tags</option>

                {TagList?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>

              {errors.tagId ? (
                <p className="alert alert-danger">{errors.tagId.message}</p>
              ) : (
                ""
              )}

              <input
                type="text"
                className="form-control my-3"
                placeholder="Price"
                id="Price"
                {...register("price", {
                  required: "Price of Category is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Please enter a valid number.",
                  },
                })}
              />
              {errors.price ? (
                <p className="alert alert-danger">{errors.price.message}</p>
              ) : (
                ""
              )}

              <select
                className="form-control my-3 text-muted"
                placeholder="categories IDs"
                id="categoriesIds"
                {...register("categoriesIds", {
                  required: "Category ID is required",
                })}
              >
                <option value="">Select Category</option>

                {CategoriesList?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>

              {errors.categoriesIds ? (
                <p className="alert alert-danger">
                  {errors.categoriesIds.message}
                </p>
              ) : (
                ""
              )}

              <textarea
                className="form-control my-3"
                placeholder="Description"
                id="Description"
                {...register("description", {
                  required: "description is required",
                })}
              />

              {errors.description ? (
                <p className="alert alert-danger">
                  {errors.description.message}
                </p>
              ) : (
                ""
              )}
              <div>
                <input
                  type="file"
                  className="form-control"
                  {...register("recipeImage", {
                    required: "Recipe Image is required",
                  })}
                />
              </div>
              <div className="button my-3">
                <button
                  onClick={backtoRecipes}
                  className="btn btn-outline-success me-2"
                >
                  cancel
                </button>
                <button onClick={backtoRecipes} className="btn btn-success">Save</button>
              </div>
            </form>
      </div>
    </>
  );
}
