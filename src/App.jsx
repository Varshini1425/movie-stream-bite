import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AllRoutes } from "./routes/AllRoutes";

const App = () => {
  return (
    <>
      <Header />
      <AllRoutes />
      <Footer />
    </>
  );
};

export default App;
