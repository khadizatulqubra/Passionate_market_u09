import{BrowserRouter,Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import Home from './pages/Home'
import About from './pages/About'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'
import Search from './pages/Search'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about"element ={<About/>}/>
        <Route element ={<PrivateRoute/>}>
        <Route path='/search' element={<Search />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/create-listing" element={<CreateListing />} />
        </Route>
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
          />
      </Routes>
    </BrowserRouter>
  )
  
}
