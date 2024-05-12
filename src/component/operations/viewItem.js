import axios from "axios";
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import {  useSelector } from "react-redux";

function ViewMedicine() {
    var user=useSelector(store=>store.auth.user);
    var token=user?.token
    const { medicineId } = useParams()
    const [medicine,setMedicine] = useState({name:'',company:'',expiry_date:''})
    useEffect(()=>{
        axios.get('https://medicalstore.mashupstack.com/api/medicine/'+medicineId,{
            headers:{'Authorization':"Bearer "+ token}}).then(response=>{
            setMedicine(response.data);
            
        }).catch(error =>{
            console.error("Error fetching medicines: ",error);
        });
    },[medicineId,token]);
    return <div className="bodyimg">
        <Navbar/>
        
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <div className="card mt-5">
                        <div className="card-header bg-primary text-white"><h3>{medicine.name}</h3></div>
                        <div className="card-body bg-secondary text-white">
                            <p><b>Company:</b> {medicine.company}</p>
                            <p><b>Expiry date:</b> {medicine.expiry_date}</p>
                        </div>
                    </div><br></br>
                    <Link to="/medicines" className="btn btn-success float-right">Back</Link>
                </div>
                
            </div>
        </div>
    </div>
}

export default checkAuth(ViewMedicine);



