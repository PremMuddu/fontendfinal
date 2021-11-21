import React, { useContext } from "react";
import Home from "../pages/Homepage";
import Register from './register';
import AppContext from "../components/context";

//import Link from "next/link";

function LandingPage() {
    const { user } = useContext(AppContext);
    //const storedUser = localStorage.getItem("currentuser");
    let isUserDefined = user; //&& storedUser && JSON.parse(storedUser);
    console.log('user: ', user);
    //console.log("stored user: ", storedUser ? JSON.parse(storedUser) : "")
    //console.log("storage: ", window.localStorage)

    const renderRegisterPage = () => {
      return (
        <div>
          <div> 
          <br></br>
          <h1>Welcome to Turbo feast!!! Support local restaurants by subscribing to our flat rate meals. We are the only delivery platform in the area that combines social cause by reducing waste and carbon foortprint. Enjoy the local flavors, save time and save money.</h1></div>
          <Register />
        </div>
      )
    }
   return (
      <>
        {isUserDefined ? <Home /> : renderRegisterPage()}
      </>
    );
  }


  export default LandingPage;
  