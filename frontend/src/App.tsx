import Navbar from "./components/Navbar"
import AppRoute from "./routes/AppRoute"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
      <ScrollToTop />
      <Navbar />
      <div style={{ paddingTop: "85px", flex: 1, display: "flex", flexDirection: "column" }}>
        <AppRoute />
      </div>
      <Footer />
    </div>
  )
}

export default App
