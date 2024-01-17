import { useState, useEffect, useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./pages/HeroSection/HeroSection";
import Footer from "./components/Footer/Footer";
import GeneratorCard from "./components/ImageGeneratorCard/GeneratorCard";
import UserProfile from "./pages/UserProfile/UserProfile";
import UserPost from "./pages/UserPost/UserPost";
import CommunityPost from "./pages/CommunityPost/CommunityPost";
import LoginRegister from "./pages/Login_Register/LoginRegister";
import Posts from "./pages/Post/Posts";


import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import { Progress, Space } from "antd";
import { UserAuthContext } from "./context/authentication";


function App() {
  const {currentUser} = useContext(UserAuthContext)
  
  const queryClient = new QueryClient()
  
  



  // Making layout where the outlet will be outlet for the virtual dom 
  const Layout = () => {
    const [render, setRender] = useState(false);
    const [percent, setPercent] = useState(0);
  
    useEffect(() => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setPercent(progress);
        if (progress >= 100) {  
          clearInterval(interval);
          setRender(true);
        }
      }, 300);
      return () => clearInterval(interval);
    }, []);
  
      return(
      <>
        {!render ? (
        <Space wrap>
          <Progress
            type="circle"
            percent={percent}
            strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
          />
        </Space>
        ) : (
          <QueryClientProvider client={queryClient}>
        <div> 
          <Navbar/>
              <Outlet/>
          <Footer/>
        </div>
    </QueryClientProvider>
        )}
    </>
    )
}      
    
  const [CurrentUser, setCurrentUser] = useState(false)
  
    useEffect(() => {
      if (currentUser) {
        setCurrentUser(true);
      } else {
        setCurrentUser(false);
      }
    }, [currentUser]);

  // for protection from no accounts
  const ProtectedRoute = ({children}) => {
    if (!CurrentUser){
      return <Navigate to="/account"/>
    }

    return children
  }



  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout/>,
      children: [{
        path:"",
        element:<HeroSection/>
      },{
        path:"/home",
        element:<HeroSection/>
      },{
        path:"/profile/:id",
        element:(
         <ProtectedRoute>
          <UserProfile/>
         </ProtectedRoute> 
        )
      }, {
        path:"/Community",
        element:(
          <ProtectedRoute>
            <CommunityPost/>
          </ProtectedRoute> 
         )
      } 
    ]
  },{
    path:"/account",
    element:<LoginRegister/>
  }])
        




  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
