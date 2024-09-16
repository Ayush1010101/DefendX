import React, { useEffect } from "react";
import "./App.css"
import Dashboard from "./components/dashboard";

const App = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/");
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
 
  return (
  <>
    <Dashboard></Dashboard>
  </>
)
}

export default App