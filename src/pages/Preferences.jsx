import React, { useState, useEffect } from "react";
import logo from "../assets/logoMusicart.png";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { FaArrowRight } from "react-icons/fa"; // Import heart and arrow icons
import { profileUser, sendPreferences } from "../api/service";

// Define options
const dietaryOptions = [
  "Pescatarian", 
  "Gluten-Free", "Keto", "Paleo", "Dairy-Free", 
  "Low-Carb"
];
const spiceToleranceOptions = ["Low", "Medium", "High"];
const allergiesOptions = [
  "Peanuts", "Tree Nuts", "Dairy", "Eggs", 
  "Soy", "Wheat", "Shellfish", "Fish", 
  "Sesame", "Gluten"
];
const meatOptions = ["Chicken", "Beef", "Pork", "Lamb", "Turkey", "Duck"];
const cookingSkillLevels = ["Beginner", "Intermediate", "Advanced"];
const language = ["English", "Hindi"];


const Preferences = () => {
  const [loader, setLoader] = useState(false);
  const [dietaryPreference, setDietaryPreference] = useState(""); // Single selection for dietary
  const [spiceTolerance, setSpiceTolerance] = useState(""); // Single selection for spice tolerance
  const [allergies, setAllergies] = useState([]); // Multiple selection for allergies
  // const [meatType, setMeatType] = useState([]); // Multiple selection for meat type
  const [cookingSkill, setCookingSkill] = useState(""); // Single selection for cooking skill level
  const [currentStep, setCurrentStep] = useState(1);
  const [languagePreference, setLanguagePreference] = useState("");


  const navigate = useNavigate();
  let auth = localStorage.getItem("token");
 

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  // Helper function to handle single selection (dietary, spice tolerance, cooking skill level)
  const handleSingleSelect = (option, setState) => {
    setState(option);
  };

  // Helper function to toggle multiple selection (allergies, meat type)
  const handleMultiSelect = (option, selectedOptions, setSelectedOptions) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  // Function to handle skip button
  const handleSkip = () => {
    navigate("/ask"); // Navigate to the home page or another desired route
  };


  // const handleNext = () => {
  //   if (currentStep === 1 && dietaryPreference) {
  //     setCurrentStep(2);
  //   } else if (currentStep === 2 && spiceTolerance) {
  //     setCurrentStep(3);
  //   } else if (currentStep === 3 && allergies.length > 0) {
  //     setCurrentStep(4);
  //   } else if (currentStep === 4 && meatType.length > 0) {
  //     setCurrentStep(5);
  //   } else if (currentStep === 5 && cookingSkill) {

  //     // fetchRecipes(token,
  //     //   {
  //     //    meatType:"Chicken"
  //     //   }
  //     // ).then()
  //     // console.log({
  //     //   dietaryPreference,
  //     //   spiceTolerance,
  //     //   allergies,
  //     //   meatType,
  //     //   cookingSkill,
  //     // });
  //     navigate("/trending");
  //   }
  // };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      profileUser(auth).then((req, res) => {
        console.log('req',req.data);

        console.log('aaa',req.data.userValidation._id)

        const userId = req.data.userValidation._id;

         // Map the language selection to the correct database value
      const languageMap = {
        English: 'en',
        Hindi: 'hi',
      };

        const preferences = {
          "dietary_restrictions":dietaryPreference,
          "spice_tolerance":spiceTolerance,
          allergies,
          "skill_level":cookingSkill,
          "language":languageMap[languagePreference]
        };
  
        sendPreferences(auth, userId, preferences)
          .then((response) => {
            console.log('Preferences updated:', response);
            navigate("/trending", { state: { preferences } });
          })
          .catch((err) => {
            console.error('Error updating preferences:', err);
          });
      });

      navigate("/trending");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {loader && (
        <div className="z-10 h-full absolute flex flex-row items-center justify-center w-full">
          <Loader />
        </div>
      )}
      <div className="flex mt-12 sm:mt-6">
        <h1 className=" text-pink-800 text-3xl ml-1 flex flex-row items-center font-semibold">
          Let's get to know you!
        </h1>
      </div>

     
      <form className="px-6 py-6 bg-white flex flex-col items-start border mt-12 sm:mt-6 border-[#D9D9D9] w-5/6 sm:w-1/3 rounded-xl">
        {currentStep === 1 && (
          <>
            <p className="text-2xl ml-2 text-pink-800">Select Your Dietary Preference</p>
            <div className="flex flex-wrap mt-4">
              {dietaryOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleMultiSelect(option,dietaryPreference, setDietaryPreference)}
                  className={`px-4 py-2 m-2 cursor-pointer rounded-lg border ${
                    dietaryPreference.includes(option)
                      ? "bg-pink-800 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <p className="text-2xl ml-2">Select Your Spice Tolerance</p>
            <div className="flex flex-wrap mt-4">
              {spiceToleranceOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSingleSelect(option, setSpiceTolerance)}
                  className={`px-4 py-2 m-2 cursor-pointer rounded-lg border ${
                    spiceTolerance === option
                      ? "bg-pink-800 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <p className="text-2xl ml-2">Select Your Allergies</p>
            <div className="flex flex-wrap mt-4">
              {allergiesOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleMultiSelect(option, allergies, setAllergies)}
                  className={`px-4 py-2 m-2 cursor-pointer rounded-lg border ${
                    allergies.includes(option)
                      ? "bg-pink-800 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </>
        )}

        {/* {currentStep === 4 && (
          <>
            <p className="text-2xl ml-2">Select Your Meat Preference</p>
            <div className="flex flex-wrap mt-4">
              {meatOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleMultiSelect(option, meatType, setMeatType)}
                  className={`px-4 py-2 m-2 cursor-pointer rounded-lg border ${
                    meatType.includes(option)
                      ? "bg-pink-800 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </>
        )} */}

        {currentStep === 4 && (
          <>
            <p className="text-2xl ml-2">Select Your Cooking Skill Level</p>
            <div className="flex flex-wrap mt-4">
              {cookingSkillLevels.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSingleSelect(option, setCookingSkill)}
                  className={`px-4 py-2 m-2 cursor-pointer rounded-lg border ${
                    cookingSkill === option
                      ? "bg-pink-800 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </>
        )}

{currentStep === 5 && (
          <>
            <p className="text-2xl ml-2">Select Your Language Preference</p>
            <div className="flex flex-wrap mt-4">
              {language.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSingleSelect(option, setLanguagePreference)}
                  className={`px-4 py-2 m-2 cursor-pointer rounded-lg border ${
                    languagePreference === option
                      ? "bg-pink-800 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </>
        )}

        <button
          type="button"
          onClick={handleNext}
          className="w-full mb-4 text-white hover:border-[#2E0052] hover:border bg-pink-800 rounded-lg h-12 mt-4"
        >
          {currentStep === 5 ? "Done" : "Next"}
        </button>

      </form>
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

export default Preferences;
