const {
  useEffect,
  useCallback,
  useState,
  useContext,
  createContext,
} = require("react");



const AuthProvider = ({ children }) => {
  const AuthContext = createContext();
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export default AuthProvider;

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
