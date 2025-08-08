import { } from 'react-router-dom'
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import { RouterContainer } from './app/routes/Routes'
function App() {
  return (
    <BrowserRouter >
      <ToastContainer theme='dark' />
      <RouterContainer />
    </BrowserRouter>
  )
}

export default App
