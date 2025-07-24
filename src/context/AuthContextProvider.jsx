import { useEffect, useState, createContext } from "react";
import { Snackbar, Slide } from "@mui/material";
import AuthContext from "./AuthContext";
import MuiAlert from "@mui/material/Alert";

const AuthContextProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || null,
    roleId: localStorage.getItem("roleId") || null,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading/auth check
  useEffect(() => {
    const checkAuth = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    checkAuth();
  }, []);

  // Show Snackbar
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

  // Login integration
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5298/api/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("roleId", data.roleId);
        setAuth({ token: data.token, roleId: data.roleId });
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

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roleId");
    setAuth({ token: null, roleId: null });
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
