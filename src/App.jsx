import{BrowserRouter,Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import Home from './pages/Home'
import About from './pages/About'
import Header from './components/Header'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about"element ={<About/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
  
}
