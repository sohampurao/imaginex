import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import SignIn from './pages/Signin';
import AddAdmin from './pages/AddAdmin';
import VirtualTours from './pages/VirtualTours';
import PageNotFound from './pages/PageNotFound';
import ScrollToTop from 'react-scroll-to-top';
import { AdminRoute, OwnerRoute } from './components/AuthRoute';
import BlogPostsList from './pages/admin/listScreens/BlogPostsList';
import CarouselList from './pages/admin/listScreens/CarouselList';
import CarouselEdit from './pages/admin/editScreens/CarouselEdit';
import BlogPostEdit from './pages/admin/editScreens/BlogPostEdit';
import AdminList from './pages/admin/listScreens/AdminList';
import AdminEdit from './pages/admin/editScreens/AdminEdit';
import Features from './pages/Features';
import FeaturesList from './pages/admin/listScreens/FeaturesList';
import FeatureEdit from './pages/admin/editScreens/FeatureEdit';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import AboutusList from './pages/admin/listScreens/AboutusList';
import AboutusEdit from './pages/admin/editScreens/AboutusEdit';
import ContactUs from './pages/ContactUs';
import ScrollRestore from './components/ScrollRestore';
import OurWork from './pages/OurWork';
import OurWorkDetails from './pages/OurWorkDetails';
import OurWorkList from './pages/admin/listScreens/OurWorkList';
import OurWorkEdit from './pages/admin/editScreens/OurWorkEdit';
import WorkEdit from './pages/admin/editScreens/WorkEdit';
import ChangePassword from './pages/admin/editScreens/ChangePassword';
import ProfileEdit from './pages/admin/editScreens/ProfileEdit';

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollRestore></ScrollRestore>
        <Navbar></Navbar>
        {/* Scroll to the top btn */}
        <ScrollToTop
          smooth
          top={1500}
          component={<i className="bi bi-arrow-up"></i>}
          className="top-[84%] left-5 lg:left-15 font-bold border-0 transition-opacity opacity-80 hover:opacity-100"
        />
        <Routes>
          <Route index path="/" element={<Home></Home>}></Route>

          {/* Our Work page */}
          <Route path="/ourwork" element={<OurWork></OurWork>}></Route>
          <Route
            path="/ourwork/work/:id"
            element={<OurWorkDetails></OurWorkDetails>}
          ></Route>

          {/* blogpost page */}
          <Route path="/blogpost/:slug" element={<BlogPost></BlogPost>}></Route>

          {/* Features */}
          <Route path="/features" element={<Features></Features>}></Route>

          {/* Virtual Tours*/}
          <Route path="/virtualtours" element={<VirtualTours />}></Route>

          {/* About Us*/}
          <Route path="/aboutus" element={<AboutUs />}></Route>

          {/* Contact Us*/}
          <Route path="/contactus" element={<ContactUs />}></Route>

          {/* Sign-In page */}
          <Route path="/admin" element={<SignIn></SignIn>}></Route>

          {/* ----- ADMIN ROUTES ----- */}

          {/* Add-Admin page */}
          <Route
            path="/addadmin"
            element={
              <OwnerRoute>
                <AddAdmin></AddAdmin>
              </OwnerRoute>
            }
          ></Route>

          {/* Profile Edit page */}
          <Route
            path="/profileedit"
            element={
              <AdminRoute>
                <ProfileEdit />
              </AdminRoute>
            }
          ></Route>

          {/* Change Password */}
          <Route
            path="/changepassword"
            element={
              <AdminRoute>
                <ChangePassword />
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

          {/* OurWorkList */}
          <Route
            path="/ourworklist"
            element={
              <AdminRoute>
                <OurWorkList></OurWorkList>
              </AdminRoute>
            }
          ></Route>

          {/* OurWorkEdit */}
          <Route
            path="/ourworkedit/:id"
            element={
              <AdminRoute>
                <OurWorkEdit></OurWorkEdit>
              </AdminRoute>
            }
          ></Route>

          {/* WorkEdit */}
          <Route
            path="/ourwork/workedit/:id"
            element={
              <AdminRoute>
                <WorkEdit></WorkEdit>
              </AdminRoute>
            }
          ></Route>

          {/* FeaturesList */}
          <Route
            path="/featureslist"
            element={
              <AdminRoute>
                <FeaturesList></FeaturesList>
              </AdminRoute>
            }
          ></Route>

          {/* FeaturesEdit */}
          <Route
            path="/featureedit/:id"
            element={
              <AdminRoute>
                <FeatureEdit></FeatureEdit>
              </AdminRoute>
            }
          ></Route>

          {/* About US List */}
          <Route
            path="/aboutuslist"
            element={
              <AdminRoute>
                <AboutusList></AboutusList>
              </AdminRoute>
            }
          ></Route>

          {/* About US Edit */}
          <Route
            path="/aboutusedit/:id"
            element={
              <AdminRoute>
                <AboutusEdit></AboutusEdit>
              </AdminRoute>
            }
          ></Route>

          {/* BlogPostEdit */}
          <Route
            path="/blogposts/:id"
            element={
              <AdminRoute>
                <BlogPostEdit></BlogPostEdit>
              </AdminRoute>
            }
          ></Route>

          {/* adminlist */}
          <Route
            path="/adminlist"
            element={
              <AdminRoute>
                <AdminList />
              </AdminRoute>
            }
          ></Route>

          {/* adminedit */}
          <Route
            path="/admin/:id"
            element={
              <AdminRoute>
                <AdminEdit />
              </AdminRoute>
            }
          ></Route>

          {/* Page-Not-Found page*/}
          <Route index path="*" element={<PageNotFound />}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
