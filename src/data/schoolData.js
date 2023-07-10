import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a new context
export const SchoolContext = createContext();

// Create a provider component that fetches data and provides it to other components
export const SchoolDataProvider = ({ children }) => {
  const [data, setSchoolData] = useState(null);


  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.defaults.headers.common["Content-Type"] = "application/json";
    const sch=localStorage.getItem("user")
    const params = new URLSearchParams();
    params.append("code", sch.code);
    axios.get('/school/school',params)
      .then(response => {
        setSchoolData(response.data);
        
      })
      .catch(error => {
        // handle error
      });
  }, []);

  // Render the provider component with the fetched data as its value
  return (
    <SchoolContext.Provider value={data}>
      {children}
    </SchoolContext.Provider>
  );
};
