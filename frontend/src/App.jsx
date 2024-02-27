import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

import Layout from "./routes/Layout";

import "rsuite/dist/rsuite.min.css";
import { CustomProvider } from "rsuite";
import Login from "./pages/auth/Login";

function App() {
  return (
    <>
      {/* <CustomProvider theme="dark"> */}
        <ToastContainer />
        <Layout />
      {/* </CustomProvider> */}
    </>
  );
}

export default App;
