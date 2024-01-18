import React from 'react'

import Layout from "./routes/Layout"


import "rsuite/dist/rsuite.min.css";
import {CustomProvider} from 'rsuite'
import Login from './pages/auth/Login';


function App() {
  return (
   <>
   <CustomProvider theme="dark">
   <Layout/>
   </CustomProvider>
   </>
  )
}

export default App
