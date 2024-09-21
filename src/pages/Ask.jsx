import React, { useState } from "react";
import RecipeCarousel from "../components/RecipeList";
import chickenImage from "../assets/Chicken-raw.jpg";
import fishImage from "../assets/fish-and-seafood.jpg";
import muttonImage from "../assets/Mutton-raw.jpeg";
import eggsImage from "../assets/Eggs-raw.avif";
import readyToCookImage from "../assets/ready-to-cook.webp";
import coldCutsImage from "../assets/cold-cuts.jpg";

const categories = [
  { name: "Chicken", imageUrl: chickenImage },
  { name: "Fish & Seafood", imageUrl: fishImage },
  { name: "Mutton", imageUrl: muttonImage },
  { name: "Eggs", imageUrl: eggsImage },
  { name: "Ready to Cook", imageUrl: readyToCookImage },
  { name: "Cold Cuts", imageUrl: coldCutsImage },
];

const recipesByCategory = {
  Chicken: [
    { id: 1, name: "Grilled Chicken", image: "https://via.placeholder.com/150", info: "A delicious grilled chicken recipe.",cuisine:"Indian" },
    { id: 2, name: "Chicken Biryani", image: "https://via.placeholder.com/150", info: "A spicy chicken biryani.",cuisine:"Chinese" },
    { id: 3, name: "Chicken Biryani", image: "https://via.placeholder.com/150", info: "A spicy chicken biryani.",cuisine:"Indian" },
  ],
  "Fish & Seafood": [
    { id: 3, name: "Grilled Salmon", image: "https://via.placeholder.com/150", info: "A tasty grilled salmon with lemon." },
    { id: 4, name: "Shrimp Tacos", image: "https://via.placeholder.com/150", info: "Mexican shrimp tacos with avocado salsa." },
  ],
  Mutton: [
    { id: 5, name: "Mutton Curry", image: "https://via.placeholder.com/150", info: "A spicy Indian-style mutton curry." },
    { id: 6, name: "Mutton Kebabs", image: "https://via.placeholder.com/150", info: "Juicy mutton kebabs, grilled to perfection." },
  ],
  Eggs: [
    { id: 7, name: "Scrambled Eggs", image: "https://via.placeholder.com/150", info: "Soft and fluffy scrambled eggs." },
    { id: 8, name: "Eggs Benedict", image: "https://via.placeholder.com/150", info: "A classic eggs benedict with hollandaise sauce." },
  ],
  "Ready to Cook": [
    { id: 9, name: "Frozen Pizza", image: "https://via.placeholder.com/150", info: "A delicious frozen pizza ready to bake." },
    { id: 10, name: "Frozen Lasagna", image: "https://via.placeholder.com/150", info: "A quick and easy frozen lasagna." },
  ],
  "Cold Cuts": [
    { id: 11, name: "Turkey Sandwich", image: "https://via.placeholder.com/150", info: "A turkey sandwich with fresh veggies." },
    { id: 12, name: "Ham & Cheese", image: "https://via.placeholder.com/150", info: "Classic ham and cheese sandwich." },
  ],
};

const filters = {
  cuisines: ["Indian", "Italian", "Chinese", "Mexican", "American"],
  mealTypes: ["Alcohol-free", "Balanced", "High-Fiber", "High-Protein", "Keto","Low-Carb", "Low-Fat","No oil added", "Sugar-conscious"],
  cookingTime: ["Under 30 mins", "30-60 mins", "Over 60 mins"],
  skills: ["Beginner", "Intermediate", "Advanced"],
  spiceTolerances: ["Low", "Medium", "High"],
};

const Ask = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    cuisines: null,
    mealTypes: null,
    cookingTimes: null,
    skills: null,
    spiceTolerances: null,
  });

  const [openFilters, setOpenFilters] = useState({
    cuisines: false,
    mealTypes: false,
    cookingTime: false,
    skills: false,
    spiceTolerances: false,
  });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleFilterSelect = (filterType, item) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: item,
    }));
  };

  const toggleFilterVisibility = (filterType) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  const filteredRecipes = recipesByCategory[selectedCategory]?.filter((recipe) =>
    selectedFilters.cuisines === null || selectedFilters.cuisines === recipe.cuisine
  );

  return (
    <div className="flex flex-col items-center">
      {!selectedCategory ? (
        <>
          <div className="flex mt-12 sm:mt-6">
            <h1 className="text-pink-800 text-3xl ml-1 flex flex-row items-center font-semibold">
              What mood are you in today?
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-6 px-6 py-6 bg-white mt-12 sm:mt-6 w-5/6 sm:w-1/2">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 border rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                onClick={() => handleCategoryClick(category.name)}
              >
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-24 h-24 object-cover rounded-full mb-4"
                />
                <h2 className="text-xl font-semibold text-pink-800">{category.name}</h2>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col mt-12 sm:mt-6 items-center">
            <h1 className="text-pink-800 text-3xl ml-1 font-semibold mt-6 mb-10">
              Popular {selectedCategory} Dishes
            </h1>

            {Object.entries(filters).map(([filterType, items]) => (
              <div key={filterType} className="flex flex-col justify-start w-full">
                <div className="flex justify-between items-center mb-2 w-full rounded-lg px-6 py-2 bg-pink-100 cursor-pointer" onClick={() => toggleFilterVisibility(filterType)}>
                  <p className="font-semibold text-lg">
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  </p>
                  <span>{openFilters[filterType] ? "▲" : "▼"}</span>
                </div>
                {openFilters[filterType] && (
                  <div className="flex flex-wrap justify-center gap-3 mb-6 mt-4">
                    {items.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleFilterSelect(filterType, item)}
                        className={`px-2 py-2 rounded-full ${
                          selectedFilters[filterType] === item
                            ? "bg-pink-800 text-white"
                            : "bg-white text-gray-800"
                        } hover:bg-pink-700 hover:text-white`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="w-80">
              <RecipeCarousel
                selectedCategory={selectedCategory}
                recipesByCategory={{ [selectedCategory]: filteredRecipes }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Ask;
