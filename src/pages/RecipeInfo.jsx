import React from 'react';
import { useLocation } from 'react-router-dom';

const RecipeInfo = () => {
  const location = useLocation();
  const { recipe } = location.state || {}; // Destructure the recipe object

  if (!recipe) {
    return <p>No recipe data found!</p>;
  }

  return (
    <div className="mt-8 w-full max-w-3xl mx-auto my-8 p-4">
        <h1 className="text-3xl font-semibold text-pink-800 mt-8">{recipe.recipe_name}</h1>
        <p className="mt-4 text-gray-600">{recipe.recipe_description}</p>

        {/* Video Section */}
        <div className="mt-8 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Video Tutorial</h2>
        <div className="mx-4 mb-4 mt-8 flex-shrink-0 bg-white rounded-lg p-4 ">
            {/* Replace 'VIDEO_ID' with the actual YouTube video ID */}
            <iframe
            src={recipe.recipe_url}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
            ></iframe>
        </div>
        </div>

        {/* Pink Divider */}
      <div className="border-t-2 border-pink-100 mt-8"></div>

        {/* Ingredients Section */}
<div className="mt-8 w-full max-w-3xl">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ingredients</h2> {/* Ensures title is left-aligned */}
  <div className="mx-4 mb-4 mt-8 flex-shrink-0 bg-white border border-gray-200 rounded-lg p-4 text-left shadow-md text-left">
    <ul className="grid grid-cols-2 gap-x-6 list-disc pl-4">
      {recipe.recipe_ingredients.map((ingredient, index) => (
        <li key={index} className="text-gray-600">{ingredient}</li>
      ))}
    </ul>
  </div>
</div>


      {/* Instructions Section */}
      <div className="mt-8 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Instructions</h2>
        <div className="mx-4 mb-4 mt-8 flex-shrink-0 bg-white border border-gray-200 text-justify rounded-lg p-4 shadow-md">
          <ol className="list-decimal list-inside pl-4">
            {recipe.recipe_steps.map((instruction, index) => (
              <li key={index} className="text-gray-600 mb-2">{instruction}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Nutrition Facts Section */}
      
      <section className="performance-facts mt-8 w-full max-w-3xl mx-auto">
        <div className="performance-facts__header">
          <h1 className="performance-facts__title text-2xl font-semibold text-gray-800 mb-4">Nutrition Facts</h1>
        </div>
<div className='mx-4 mb-4 mt-8 flex-shrink-0 bg-white border border-gray-200 text-justify rounded-lg p-4 shadow-md'>
        <table className="performance-facts__table w-full border-collapse">
          <thead>
            <tr>
              <th colSpan="3" className="amps text-left border-b border-gray-400 py-2 text-lg">Amount Per Serving</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan="2" className="text-left text-lg py-2"><b>Calories</b></th>
              <td className="text-right">{recipe.recipe_nutrients.calories || '-'}</td>
            </tr>
            <tr className="thick-row border-t border-gray-400">
              <td colSpan="3" className="small-info py-2 text-left text-sm"><b>% Daily Value*</b></td>
            </tr>
            <tr>
              <th colSpan="2" className="text-left py-2"><b>Total Fat</b></th>
              <td className="text-right">{recipe.recipe_nutrients.total_fat || '-'}</td>
            </tr>
            <tr>
              <td className="blank-cell"></td>
              <th className="text-left py-1">Saturated Fat</th>
              <td className="text-right">{recipe.recipe_nutrients.saturated_fat || '-'}</td>
            </tr>
            <tr>
              <th colSpan="2" className="text-left py-2"><b>Protein</b></th>
              <td className="text-right">{recipe.recipe_nutrients.protein || '-'}</td>
            </tr>
          </tbody>
        </table>

        <table className="performance-facts__table--grid w-full border-collapse mt-4">
          <tbody>
            <tr>
              <th className="text-left py-2">Vitamin D</th>
              <td className="text-right">{recipe.recipe_nutrients.vitamin_d || '-'}</td>
            </tr>
            <tr>
              <th className="text-left py-2">Calcium</th>
              <td className="text-right">{recipe.recipe_nutrients.calcium || '-'}</td>
            </tr>
            <tr>
              <th className="text-left py-2">Iron</th>
              <td className="text-right">{recipe.recipe_nutrients.iron || '-'}</td>
            </tr>
            <tr className="thin-end border-t border-gray-400">
              <th className="text-left py-2">Potassium</th>
              <td className="text-right">{recipe.recipe_nutrients.potassium || '-'}</td>
            </tr>
          </tbody>
        </table>
        </div>
        <p className="small-info text-sm mt-4">*Percent Daily Values are based on a 2000 calorie diet</p>
      </section>


    </div>
  );
};

export default RecipeInfo;
