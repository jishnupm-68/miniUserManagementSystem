
import { createBrowserRouter, RouterProvider } from 'react-router'
import adminRouter from './routes/AdminRouter'
import {Provider} from "react-redux"
import appStore from './store/appStore'
import userRouter from './routes/UserRouter'
const App = () => {
  const router = createBrowserRouter([...adminRouter, ...userRouter])
  return (
    <div > 
      <Provider store={appStore}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  )
}

export default App
