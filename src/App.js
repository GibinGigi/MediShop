import './App.css'; 
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  function gotoRegister() {
    navigate('register');
  }

  function gotoLogin() {
    navigate('login');
  }

  return (
    <div className="background">
      <div className="button-container">
        <div className='button'>
        <button className="btn btn-light text-primary" onClick={gotoRegister}>Register</button>
        <button className="btn btn-light ml-3 text-primary" onClick={gotoLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default App;
