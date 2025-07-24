import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { Snackbar, Slide } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const AuthContextProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    checkAuth();
  }, []);

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const SlideTransition = (props) => {
    return <Slide {...props} direction="up" />;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        setSnackbarMessage,
        setSnackbarSeverity,
        setOpenSnackbar,
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
