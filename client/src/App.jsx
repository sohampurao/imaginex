import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import Signin from './pages/Signin';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route index path="/" element={<Home></Home>}></Route>

          {/* blog post page */}
          <Route
            path="blogpost/slug/:slug"
            element={<BlogPost></BlogPost>}
          ></Route>

          {/* signin page */}
          <Route path="/signin" element={<Signin></Signin>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
