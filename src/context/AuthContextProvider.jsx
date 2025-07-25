import { useEffect, useState, createContext } from "react";
import { Snackbar, Slide } from "@mui/material";
import AuthContext from "./AuthContext";
import MuiAlert from "@mui/material/Alert";
import { useLoginMutation } from "../redux/api/authAPI";

const AuthContextProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [auth, setAuth] = useState({
    token: null,
    roleId: null,
    name: null,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [loginMutation] = useLoginMutation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("roleId");

    if (token && roleId) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setAuth({
          token,
          roleId,
          name: payload.name,
        });
        setIsAuthenticated(true);
      } catch (e) {
        console.error("Invalid token:", e);
        localStorage.removeItem("token");
        localStorage.removeItem("roleId");
      }
    }
    setIsLoading(false);
  }, []);

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const SlideTransition = (props) => <Slide {...props} direction="up" />;

  const login = async (email, password) => {
    try {
      const data = await loginMutation({ email, password }).unwrap();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("roleId", data.roleId);
        const payload = JSON.parse(atob(data.token.split(".")[1]));
        setAuth({
          token: data.token,
          roleId: data.roleId,
          name: payload.name,
        });
        setIsAuthenticated(true);
        showSnackbar(data.message || "Login successful!", "success");
        return { success: true, redirectUrl: data.redirectUrl };
      } else {
        showSnackbar(data.message || "Login failed.", "error");
        return { success: false };
      }
    } catch (error) {
      showSnackbar("Server error. Please try again.", "error");
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roleId");
    setAuth({ token: null, roleId: null, name: null });
    setIsAuthenticated(false);
    showSnackbar("Logged out successfully.", "info");
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        isLoading,
        isAuthenticated,
        login,
        logout,
        showSnackbar,
        handleCloseSnackbar,
        SlideTransition,
        isMenuOpen,
        setIsMenuOpen,
      }}
    >
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={3000}
        TransitionComponent={SlideTransition}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
