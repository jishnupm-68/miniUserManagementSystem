
import { createBrowserRouter, RouterProvider } from 'react-router'
import adminRouter from './routes/AdminRouter'

const App = () => {
  const router = createBrowserRouter([...adminRouter])
  return (
    <div > 
      <RouterProvider router={router} />
     
    </div>
  )
}

export default App
