import AdminPage from "../Components/Admin/AdminPage"
import Login from "../Components/page/Login"
import Signup from "../Components/page/Signup"

const adminRouter = [
    {
        path:"/admin/", element:<AdminPage />,
        children:[
            {path:"/admin/login", element:<Login />},
            {path:"/admin/signup", element:<Signup />}

        ]

    }
]


export default adminRouter