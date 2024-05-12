import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import {  useSelector } from "react-redux";

function EditMedicine() {
    const { medicineId } = useParams();
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [date, setDate] = useState('');
    let navigate = useNavigate();
    var user=useSelector(store=>store.auth.user);
    useEffect(()=>{
        axios.get('https://medicalstore.mashupstack.com/api/medicine/'+medicineId,{
            headers:{'Authorization':"Bearer "+ user.token},}).then(response=>{
            setName(response.data.name);
            setCompany(response.data.company);
            setDate(response.data.expiry_date);
        });
    },[medicineId,user.token]);
    function updateMedicine(){
        axios.post('https://medicalstore.mashupstack.com/api/medicine/'+medicineId,{
            name: name,
            company: company,
            expiry_date:date
        },{
            headers:{'Authorization':"Bearer "+ user.token},}).then(response=>{
            alert(response.data.message)
        })
        navigate('/medicines');
    }
    return <div className="bodyimg">
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center">Edit Medicine</h1>
                    <div className="form-group">
                        <label>Name:</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={name} 
                        onChange={(event)=>{setName(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Company:</label>
                        <input
                        type="text" 
                        className="form-control" 
                        value={company} 
                        onChange={(event)=>{setCompany(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Expiry Date:</label>
                        <input
                        type="date" 
                        className="form-control" 
                        value={date} 
                        onChange={(event)=>{setDate(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success float-right" onClick={updateMedicine}>Submit</button>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
}

export default checkAuth(EditMedicine);



