import Axios from "axios";

// Base url
const apiUrl = process.env.REACT_APP_API_BASE_URL;

// API call to create an account
export const registerUser = async (user) => {
  try {
    // Return the response
    return await Axios.post(apiUrl + "/api/users/register", user);
  } catch (error) {
    throw new Error("Server Error");
  }
};

// API call to login
export const loginUser = async (user) => {
  try {
    // Return the response
    return await Axios.post(apiUrl + "/api/users/login", user);
  } catch (error) {
    throw new Error("Server Error");
  }
};
// API call for profile
export const profileUser = async (token) => {
  try {
    // Return the response
    return await Axios.get(apiUrl + "/api/users/profile", {
      headers: {
        authorization: token,
      },
    });
  } catch (error) {
    throw new Error("Server Error");
  }
};

export const sendPreferences = async (token, id, preferences) => {
  try {
    // Make the PUT request to update user preferences
    const response = await Axios.put(
      `${apiUrl}/api/users/${id}`,
      preferences,  // Pass preferences in the body
      {
        headers: {
          authorization: token,
        },
      }
    );
    
    return response; // Return the API response
  } catch (error) {
    console.error("Error sending preferences:", error);
    throw new Error("Server Error"); // Handle server errors
  }
};

export const fetchRecipe = async (token,id, preferences) => {
  try {
    console.log("preff",preferences)
    // Construct the query string from preferences
    const params = {};

    // Convert dietaryPreference and allergies to comma-separated strings
    if (preferences.meal_type) {
      params.meal_type = (preferences.meal_type).toLowerCase().join(',');
    }
    if (preferences.spiceTolerance) {
      params.spiceTolerance = preferences.spiceTolerance.toLowerCase();
    }
    if (preferences.allergies) {
      params.allergies = (preferences.allergies).toLowerCase().join(',');
    }
    if (preferences.cookingSkill) {
      params.cookingSkill = preferences.cookingSkill.toLowerCase();
    }
    if(preferences.meat_type){
      params.meat_type = preferences.meat_type.toLowerCase()
    }
    if(preferences.cuisine){
      params.cuisine = preferences.cuisine.toLowerCase()
    }
    if(preferences.prep_time_range){
      params.prep_time_range = preferences.prep_time_range
    }
    console.log('p',params)

    // Construct the query string from the params
    const queryParams = new URLSearchParams(params).toString();
    console.log('qp',queryParams)
    console.log(`${apiUrl}/api/recipes/filter?user_id=${id}&${queryParams}`)
    
    const response = await Axios.get(`${apiUrl}/api/recipes/filter?user_id=${id}&${queryParams}`, {
      headers: { authorization: token },
    });

    console.log('resp',response.data)
    
    return response.data; // Return only the data
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    throw new Error("Server Error");
  }
};