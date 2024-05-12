import { NavLink ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/authSlice";
import axios from "axios";

function Navbar() {
    var user = useSelector(store=>store.auth.user);
    const dispatch = useDispatch ();
    const navigate= useNavigate();
    function logout() {
        if (user) {
          axios.post(
            'https://medicalstore.mashupstack.com/api/logout',
            {},
            {
              headers: { Authorization: 'Bearer ' + user.token },
            }
          );
          dispatch(removeUser());
          navigate('/');
        }
      }
      
    return <nav className="navbar navbar-expand-sm navbar-light bg-primary">
        <div className="navbar-brand">
            <h4 className="text-light">Medishop</h4>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mr-auto" id="navbarNav" style={{ float: "left" }}>
            <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                
                <li className="nav-item">
                    <NavLink to={"/medicines"} className="nav-link text-warning" activeClassName="active">
                        Medicine list
                    </NavLink>
                </li>
                {user?
                    <li className="nav-item">
                        <span className="nav-link text-warning" onClick={logout}>Logout</span>
                    </li>:
                    <li className="nav-item">
                    <NavLink 
                    to={"/"} 
                    className="nav-link" activeClassName="active" 
                    >
                        Login
                    </NavLink>
                    </li>
            }

                
            </ul>
        </div>
    </nav>;
}

export default Navbar;