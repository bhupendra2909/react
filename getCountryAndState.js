import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

function GetCountryData() {
  const [countryList, setCountryList]= useState([]);
  const [countryID, setCountryID]= useState('');
  const [stateList, setStateList]= useState([]);

  useEffect( ()=>{
   const getcountry = async ()=>{
     const response = await fetch("http://localhost/data/country");
     const countryList = await response.json();
     console.log(countryList);
     setCountryList(await countryList);
   }
   getcountry();
  },[]);

  const handlecountry = (event) =>{
    const getCountryID = event.target.value;
    setCountryID(getCountryID);
    event.preventDefault();
  }

  useEffect( ()=>{
    const getState= async ()=>{
      const responsestate = await fetch(`http://localhost/data/state/getstate/${countryID }`);
      const getState = responsestate.json();
      setStateList(await getState);
    }
    getstate();
  },[countryID]);

   
  return (
    <Container className="content">
     <div className="row">
       <div className="col-sm-12">
             <div className="row mb-3">
                 <div className="form-group col-md-4">
                 <label className="mb-2">Country</label>
                 <select name="country" className="form-control" onChange={(e)=>handlecountry(e)}>
                   <option>--Select Country--</option>
                   {
                     countryList.map( (countrysingle)=>(
                          <option key={countrysingle.country_id} value={countrysingle.country_id }> { countrysingle.country_name}</option>
                     ))
                }
                 
                 </select>
               </div>
               <div className="form-group col-md-4">
               <label className="mb-2">State</label>
               <select name="state" className="form-control">
                   <option>--Select State--</option>
                   {
                     stateList.map( (statesingle,index)=>(                    
                   <option key={index} value={statesingle.state_id}>{ statesingle.state_name}</option>
                     ))
                     }
                 </select>
               </div>

               <div className="form-group col-md-2 mt-4">              
                      <button className="btn btn-success mt-2" >Submit</button>               
               </div>
            </div>
               
       </div>
     </div>
    </Container>
  );
}
export default GetCountryData;
