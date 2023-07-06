
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginReg from './pages/auth/LoginReg';
import ResetPassword from './pages/auth/PasswordReset';
import SendPasswordResetEmail from './pages/auth/SendPasswordEmail';
import OTP from './pages/OTP';
import { AuthProvider } from './context/AuthContext';
import DescriptionItem from './pages/DescriptionItem';
import Cart from './components/Cart/Cart';
import PrivateRoute from './components/PrivateRoutes/PrivateRoute';
import SearchComponent from './components/Searching/Search';

function App() {
  return (
    <div className="App">
    <Router>
    <AuthProvider>
    <Navbar/>
    <Routes>

 <Route element={<PrivateRoute />}>

 <Route path='/cart' element={<Cart/>}/>


                        </Route>
      <Route path='/' element={<Home/>} />
      <Route path='/menu' element={<Menu/>}/>
      <Route path='/items/:item_id' element={<DescriptionItem/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path="/login" element={<LoginReg/>}/>
      <Route path='/send-email' element={<SendPasswordResetEmail/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>
      <Route path='/verify' element={<OTP/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/search/:name' element={<SearchComponent/>}/>

      
    </Routes>
    <Footer/>
    </AuthProvider>
    </Router>
    
    </div>
  );
}

export default App;
