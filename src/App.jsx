import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AllRoutes } from "./routes/AllRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "./context/ThemeContext";

const App = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <>
      <div
        className={`${
          isDarkMode ? "dark" : ""
        } min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}
      >
        <ToastContainer />
        <Header />
        <AllRoutes />
        <Footer />
      </div>
    </>
  );
};

export default App;
