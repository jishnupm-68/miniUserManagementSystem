import UserDashBoard from "../Components/User/Page/UserDashboard"
import UserLogin from "../Components/User/Page/UserLogin"
import UserSignup from "../Components/User/Page/UserSignup"
import UserPage from "../Components/User/UserPage"
import UserProtectRoute from "../Components/User/UserProtectRoute"



const userRouter = [
    {path:"/user/", element:<UserPage />,
        children:[
            {path:"/user/login", element:<UserLogin />},
            {path:"/user/signup", element:<UserSignup />},
            {element:<UserProtectRoute />,
                children:[
                    {path:"/user/Dashboard", element:<UserDashBoard />}
                ]
            }
        ],
    }
]


export default userRouter