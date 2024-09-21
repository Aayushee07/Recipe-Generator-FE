import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecipeCarousel = ({ recipesByCategory }) => {
  const settings = {
    // dots: true, // Show dots for navigation
    infinite: true, // Infinite loop
    speed: 500, // Transition speed
    slidesToShow: 2, // Show 2 slides at a time
    slidesToScroll: 1, // Scroll 1 slide at a time
    responsive: [
      {
        breakpoint: 1024, // For smaller screens
        settings: {
          slidesToShow: 1, // Show 1 slide at a time on smaller screens
        },
      },
    ],
  };

  return (
    <div className="w-5/6 sm:w-1/2 mx-auto bg-white">
      <Slider {...settings}>
        {recipesByCategory.map((recipe, index) => (
          <div key={index} className="p-4">
            <div
              className="flex flex-col items-center p-4 border rounded-lg shadow-md hover:shadow-lg cursor-pointer"
              onClick={() => console.log(`Open recipe page for: ${recipe._id}`)}
            >
              <img
                src={recipe.recipe_img}
                alt={recipe.name}
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
              <h2 className="mt-4 text-xl font-semibold text-pink-800">
                {recipe.recipe_name}
              </h2>
              <p className="text-sm text-gray-600 mt-2">{recipe.recipe_description
              }</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RecipeCarousel;
