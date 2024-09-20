import React, { createContext, useState } from "react";

export const AuthContext = createContext("");

const UserContext = ({ children }) => {
  // This code creates a context for user authentication
  // It manages the user's authentication state using useState
  // and provides this state to child components via AuthContext.Provider
  const [userAuth, setUserAuth] = useState(false);
  return (
    <AuthContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserContext;
