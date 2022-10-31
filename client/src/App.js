import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Profile from "./pages/Profile"
import Navbar from './components/Navbar/Navbar';
import Feed from "./pages/Feed";
import PrivateRoutes from "./components/Private/PrivateRoutes";
import { UidContext } from "./context/UserContext";
import { useContext } from "react";
import PublicRoutes from "./components/Private/PublicRoutes";

function App() {
  const uid = useContext(UidContext)
  console.log(uid)
  return (


    <>
      <Navbar />
      <div className="App">
        <Routes>
          <Route element ={<PublicRoutes/>}>

          <Route path='/' element={<Home />} />

          </Route>
          
          <Route element={<PrivateRoutes />} >
            <Route path='/feed' element={<Feed />}  />
            <Route path='/profil/:id' element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </>

  )
}

export default App;
