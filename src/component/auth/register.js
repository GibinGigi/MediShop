import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConf, setPasswordConf] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();
    function registerUser(){
        var user = {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConf
        }
        axios.post('https://medicalstore.mashupstack.com/api/register',user).then(response=>{
            setErrorMessage('');
            navigate('/login');
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            }else{
                setErrorMessage('Failed to connect to api');
            }
        })
    }
    return <div className="background">
        
        <div className="container pt-5">
            <div className="row">
                <div className="col-8 offset-2 text-secondary">
                    <h1>Register New User</h1>
                    {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
                    <div className="form-group">
                        <label className="text-white">Name:</label>
                        <input type="text"
                        className="form-control"
                        value={name}
                        placeholder="Name:"
                        onInput={(event)=>setName(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-white">Email:</label>
                        <input type="text"
                        className="form-control"
                        value={email}
                        placeholder="Email:"
                        onInput={(event)=>setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-white">Password:</label>
                        <input type="password"
                        className="form-control"
                        value={password}
                        placeholder="Password:"
                        onInput={(event)=>setPassword(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-white">Confirm Password:</label>
                        <input type="password"
                        className="form-control"
                        value={passwordConf}
                        placeholder="Confirm Password:"
                        onInput={(event)=>setPasswordConf(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary " onClick={registerUser}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Register;