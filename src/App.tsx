import { } from 'react-router-dom'
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import { RouterContainer } from './app/routes/Routes'
import { AuthProvider } from './app/context/AuthContext'
import { TabProvider } from './app/context/activeTabContext'
function App() {
  return (
    <BrowserRouter >
      <AuthProvider>
        <TabProvider>
          <ToastContainer theme='dark' />
          <RouterContainer />
        </TabProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
