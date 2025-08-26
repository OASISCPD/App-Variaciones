import { } from 'react-router-dom'
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import { RouterContainer } from './app/routes/Routes'
import { AuthProvider } from './app/context/AuthContext'
function App() {
  return (
    <BrowserRouter >
      <AuthProvider>
        <ToastContainer theme='dark' />
        <RouterContainer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
