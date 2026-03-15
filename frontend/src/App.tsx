import Navbar from "./components/Navbar"
import AppRoute from "./routes/AppRoute"


function App() {
  return (
    <>
     <Navbar></Navbar>
     <div className="flex items-center justify-center w-full">
     <AppRoute></AppRoute>
     </div>
    </>
  )
}

export default App
