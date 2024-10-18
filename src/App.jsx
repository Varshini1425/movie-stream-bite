import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AllRoutes } from "./routes/AllRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Flip"
      />
      <Header />
      <AllRoutes />
      <Footer />
    </>
  );
};

export default App;
