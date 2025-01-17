import React,{useState} from "react";
import "../styles/login.css"; // You can add specific styles for the carousel here
import { useNavigate } from "react-router-dom";

import { FaArrowRight } from "react-icons/fa"; // Import heart and arrow icons

const TrendingRecipes = () => {

     // State to track liked recipes
  const [likedRecipes, setLikedRecipes] = useState([]);
  const navigate = useNavigate();


  // Toggle like status
  const toggleLike = (id) => {
    if (likedRecipes.includes(id)) {
      setLikedRecipes(likedRecipes.filter((recipeId) => recipeId !== id));
    } else {
      setLikedRecipes([...likedRecipes, id]);
    }
  };

    // Function to handle skip button
    const handleSkip = () => {
        navigate("/home"); // Navigate to the home page or another desired route
      };

   // Navigate to individual recipe page
   const openRecipePage = (recipe) => {
    navigate('/recipeinfo', { state: { recipe } });
  };
  // Sample data for the carousel
  const recipes = [
    {
      id: 1,
      name: "Spaghetti Carbonara",
      image: "https://via.placeholder.com/150",
      info: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
      ingredients: ["ingcf1", "ingcervc2", "increg3", "inghwdgew", "hdegfcveh"],
      instructions: [
        "Boil spaghetti: Bring a large pot of salted water to a boil. Cook spaghetti for 8-10 minutes, then drain and set aside.",
        "Cook beef: Heat olive oil in a pan. Add chopped onion and garlic, cook until soft. Add ground beef, cook until browned, then season with salt and pepper.",
        "Mix with sauce: Stir in tomato paste, canned tomatoes, oregano, and basil. Simmer for 10-15 minutes. Mix cooked spaghetti with the sauce and serve with Parmesan cheese."
      ],
      recipe_nutrients: {
        "calories": "650",
        "protein": "35g"
      },

    },
    {
      id: 2,
      name: "Chicken Curry",
      image: "https://via.placeholder.com/150",
      info: "A flavorful dish made with a blend of spices and tender chicken pieces.",
      ingredients: ["ing1", "ing2", "ing3", "ing4"],
      instructions: ["step1", "step2", "step3"],
    },
    {
      id: 3,
      name: "Caesar Salad",
      image: "https://via.placeholder.com/150",
      info: "A fresh salad with romaine lettuce, croutons, and Caesar dressing.",
      iingredients: ["ing1", "ing2", "ing3", "ing4"],
      instructions: ["step1", "step2", "step3"],
    },
    {
      id: 4,
      name: "Tacos",
      image: "https://via.placeholder.com/150",
      info: "Mexican dish consisting of folded or rolled tortillas filled with various mixtures.",
      ingredients: ["ing1", "ing2", "ing3", "ing4"],
      instructions: ["step1", "step2", "step3"],
    },
    {
      id: 5,
      name: "Pad Thai",
      image: "https://via.placeholder.com/150",
      info: "A popular stir-fried rice noodle dish from Thailand.",
      ingredients: ["ing1", "ing2", "ing3", "ing4"],
      instructions: [
        "Boil spaghetti: Bring a large pot of salted water to a boil. Cook spaghetti for 8-10 minutes, then drain and set aside.",
        "Cook beef: Heat olive oil in a pan. Add chopped onion and garlic, cook until soft. Add ground beef, cook until browned, then season with salt and pepper.",
        "Mix with sauce: Stir in tomato paste, canned tomatoes, oregano, and basil. Simmer for 10-15 minutes. Mix cooked spaghetti with the sauce and serve with Parmesan cheese."
      ],
    },
    // Add more dishes as needed
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mt-12 sm:mt-6 mb-8">
        <h1 className="text-pink-800 text-3xl ml-1 flex flex-row items-center font-semibold">
          Hot Picks for you !
        </h1>
      </div>
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="min-w-[200px] mx-8 mb-4 flex-shrink-0 bg-white border border-gray-200 rounded-lg p-4 shadow-md"
              onClick={() => openRecipePage(recipe)} 
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-[150px] object-cover rounded-lg"
              />
              <div className="">
              <div>
              <h2 className="mt-4 text-xl font-semibold text-pink-800">
                {recipe.name}
              </h2>
              </div>
              {/* Heart Button for Like */}
              <div>
              {/* <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click when liking
                  toggleLike(recipe.id);
                }}
                className="text-red-500 text-2xl"
              >
                {likedRecipes.includes(recipe.id) ? <FaHeart /> : <FaRegHeart />}
              </button> */}
              </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">{recipe.info}</p>
            </div>
          ))}

          {/* Floating Skip Button */}
      <button
        onClick={handleSkip}
        className="fixed flex flex-row bottom-4 right-4 bg-pink-800 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        SKIP
        <FaArrowRight className="mt-1 ml-2" />
      </button>
       
      </div>
    
  );
};

export default TrendingRecipes;
