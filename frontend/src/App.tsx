import Navbar from "./components/Navbar"
import AppRoute from "./routes/AppRoute"
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: '#1e1e2d',
            color: '#fff',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        }} 
      />
      <Navbar />
      <div style={{ paddingTop: "85px" }}>
        <AppRoute />
      </div>
    </>
  )
}

export default App
