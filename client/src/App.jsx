import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import SignIn from './pages/SignIn';
import AddAdmin from './pages/AddAdmin';
import VirtualTours from './pages/VirtualTours';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route index path="/" element={<Home></Home>}></Route>

          {/* blog post page */}
          <Route
            path="/blogpost/slug/:slug"
            element={<BlogPost></BlogPost>}
          ></Route>

          {/* Virtual Tours*/}
          <Route path="/virtualtours" element={<VirtualTours />}></Route>

          {/* Sign-In page */}
          <Route path="/signin" element={<SignIn></SignIn>}></Route>

          {/* Add-Admin page */}
          <Route path="/addadmin" element={<AddAdmin></AddAdmin>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
