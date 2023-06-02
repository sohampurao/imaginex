import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import SignIn from './pages/SignIn';
import AddAdmin from './pages/AddAdmin';
import VirtualTours from './pages/VirtualTours';
import PageNotFound from './pages/PageNotFound';
import ScrollToTop from 'react-scroll-to-top';
import Dashboard from './components/Dashboard';
import AdminRoute from './components/AdminRoute';
import BlogPostsList from './pages/admin/listScreens/BlogPostsList';
import CarouselList from './pages/admin/listScreens/CarouselList';
import CarouselEdit from './pages/admin/editScreens/CarouselEdit';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        {/* Scroll to the top btn */}
        <ScrollToTop
          smooth
          top={1500}
          component={<i className="bi bi-arrow-up"></i>}
          className="left-5 bottom-4 font-bold text-white border-0 opacity-80 hover:opacity-100"
        />
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

          {/* ----- ADMIN ROUTES ----- */}

          {/* Add-Admin page */}
          <Route
            path="/addadmin"
            element={
              <AdminRoute>
                <AddAdmin></AddAdmin>
              </AdminRoute>
            }
          ></Route>

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <Dashboard></Dashboard>
              </AdminRoute>
            }
          ></Route>

          {/* CarouselList */}
          <Route
            path="/carousellist"
            element={
              <AdminRoute>
                <CarouselList />
              </AdminRoute>
            }
          ></Route>

          {/* CarouselEdit */}
          <Route
            path="/carousel/:id"
            element={
              <AdminRoute>
                <CarouselEdit />
              </AdminRoute>
            }
          ></Route>

          {/* BlogPostList */}
          <Route
            path="/blogpostslist"
            element={
              <AdminRoute>
                <BlogPostsList></BlogPostsList>
              </AdminRoute>
            }
          ></Route>

          {/* Page-Not-Found page*/}
          <Route index path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
