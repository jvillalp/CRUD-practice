import React, { useState, useEffect } from "react";

import AnimalForm from "./AnimalForm.js";
import AnimalList from "./AnimalsList.js";
import { axiosWithAuth } from "../utils/axiosWithAuth.js";

export default function AnimalDashboard() {
    
    const [ animals, setAnimals ] = useState([]);
    const [ isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    
    // How can get fetch the data from the server when the component mounts?
    // How can we capture and set that data to state?
    
        useEffect (() => {
            setIsLoading(true)
            // console.log("should be true",isLoading)
            setTimeout(() => {
            
            axiosWithAuth()
                .get('animals')
                .then(response => {
                    console.log(response.data)
                    setAnimals(response.data)
                    setIsLoading(false)
                })
                .catch(error => {
                    console.log(`Error fetching animals ${error.response}`)
                    setError(error);
                    setIsLoading(false);
                })
        },2000)}, [])
        
    return(
        <div className="dash">
            {isLoading && <div style={{color:'green', fontSize: 50}}>loading...</div>}
            {error && <div style={{color:'red', fontSize: 50}}>Not working!!</div>}
            <AnimalForm animals={animals} updateAnimals={setAnimals} />
            <AnimalList animals={animals} />
        </div>
    )
}