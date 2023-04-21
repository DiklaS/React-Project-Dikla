import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import RegisterPage from "../pages/RegisterPage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage";
import EditCardPage from "../pages/EditCardPage";
import ProtectedRoute from "../components/ProtectedRoute";
import ProfilePage from "../pages/ProfilePage";
import SuperProtectedRoute from "../components/SuperProtectedRoute";
import LogoutPage from "../pages/LogoutPage";
import ResponsiveAppBar from "../components/Navbar/ResponsiveAppBar";
import FavoritesPage from "../pages/FavoritesPage";
import CreateCardPage from "../pages/CreateCardPage";
import MyCardsPage from "../pages/MyCardsPage";
import DetailedCardPage from "../pages/DetailedCardPage";
import SignupPage from "../pages/SignupPage";
import REGPage from "../pages/REGPage";
//element={<ProtectedRoute element={<LogoutPage />} />}

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.TRY} element={<ResponsiveAppBar />} />
      <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
      <Route path={ROUTES.DETAILEDCARD} element={<DetailedCardPage />} />
      <Route path={ROUTES.LOGOUT} element={<ProtectedRoute element={<LogoutPage />} />}/>
      <Route path="/edit/:id" element={<SuperProtectedRoute isAdmin={true} isBiz={true} element={<EditCardPage />}/>}/>
      <Route path={ROUTES.CARDLIKE} element={<ProtectedRoute element={<FavoritesPage />} />}/>
      <Route path={ROUTES.PROFILE} element={<ProtectedRoute element={<ProfilePage />} />}/>
      <Route path={ROUTES.CREATECARD} element={<SuperProtectedRoute isAdmin={false} isBiz={true} element={<CreateCardPage/>}/>}/>
      <Route path={ROUTES.MYCARDS} element={<SuperProtectedRoute isAdmin={true} isBiz={true} element={<MyCardsPage/>}/>}/>
      <Route path="*" element={<h1>404</h1>} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage/>}/>
      {/* //<Route path="/reg" element={<REGPage/>}/> */}
    </Routes>
    
  );
};

export default Router;
