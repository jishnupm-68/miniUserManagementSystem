import AdminPage from "../Components/Admin/AdminPage"
import Dashboard from "../Components/Admin/page/Dashboard"
import Login from "../Components/Admin/page/Login"
import Signup from "../Components/Admin/page/Signup"
import ProtectRoute from "../Components/Admin/ProtectRoute"

const adminRouter = [
    {path:"/admin/", element:<AdminPage />,
        children:[
            {path:"/admin/login", element:<Login />},
            {path:"/admin/signup", element:<Signup />},
            {element:<ProtectRoute />,
                children:[
                    {path:"/admin/Dashboard", element:<Dashboard />}
                ]
            }
        ],
    }
]


export default adminRouter