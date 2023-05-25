import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route index path="/" element={<Home></Home>}></Route>
          <Route
            path="blogposts/slug/:slug"
            element={<BlogPost></BlogPost>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
