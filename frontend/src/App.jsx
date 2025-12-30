
import { createBrowserRouter, RouterProvider } from 'react-router'
import adminRouter from './routes/AdminRouter'
import {Provider} from "react-redux"
import appStore from './store/appStore'
const App = () => {
  const router = createBrowserRouter([...adminRouter])
  return (
    <div > 
      <Provider store={appStore}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  )
}

export default App
