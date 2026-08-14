import Navbar from "./components/Navbar"
import AppRoute from "./routes/AppRoute"

function App() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "85px" }}>
        <AppRoute />
      </div>
    </>
  )
}

export default App
