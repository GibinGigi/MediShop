import { createBrowserRouter } from "react-router-dom";
import Register from "./component/auth/register";
import App from "./App";
import Login from "./component/auth/login";
import CreateMedicine from "./component/operations/createList"
import ListItem from "./component/operations/listItem";
import ViewMedicine from "./component/operations/viewItem"
import EditMedicine from "./component/operations/editList";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'register', element: <Register/> },
    { path: '/login', element:<Login/>},
    { path: '/medicines', element: <ListItem/>},
    { path: '/medicines/create', element:<CreateMedicine/>},
    { path: '/medicines/:medicineId', element:<ViewMedicine/>},
    { path : '/medicines/:medicineId/edit', element: <EditMedicine/>}
   
    
]);

export default router;