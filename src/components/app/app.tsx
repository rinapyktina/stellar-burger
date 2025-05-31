import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  AppHeader,
  Modal,
  OrderInfo,
  IngredientDetails,
  Center
} from '@components';
import { useDispatch } from '../../services/store';
import { getIngredientsThunk, getUserThunk } from '@slices';
import React, { useEffect } from 'react';
import { ProtectedRoute } from '../protected-route';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(getUserThunk());
    dispatch(getIngredientsThunk());
  }, [dispatch]);

  const renderRoute = (
    path: string,
    element: React.ReactNode,
    title: string
  ) => <Route path={path} element={<Center title={title}>{element}</Center>} />;

  const renderModalRoute = (
    path: string,
    element: React.ReactNode,
    title: string,
    onClose: () => void
  ) => (
    <Route
      path={path}
      element={
        <Modal title={title} onClose={onClose}>
          {element}
        </Modal>
      }
    />
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        {renderRoute(
          '/ingredients/:id',
          <IngredientDetails />,
          'Детали ингредиента'
        )}
        <Route path='/feed' element={<Feed />} />
        {renderRoute(
          '/feed/:number',
          <OrderInfo />,
          `#${location.pathname.match(/\d+/)}`
        )}
        <Route element={<ProtectedRoute forAuthorized={false} />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute forAuthorized />}>
          <Route path='/profile'>
            <Route index element={<Profile />} />
            <Route path='orders' element={<ProfileOrders />} />
            {renderRoute(
              '/profile/orders/:number',
              <OrderInfo />,
              `#${location.pathname.match(/\d+/)}`
            )}
          </Route>
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          {renderModalRoute(
            '/feed/:number',
            <OrderInfo />,
            `#${location.pathname.match(/\d+/)}`,
            () => navigate(-1)
          )}
          {renderModalRoute(
            '/ingredients/:id',
            <IngredientDetails />,
            'Детали ингредиента',
            () => navigate(-1)
          )}
          <Route element={<ProtectedRoute forAuthorized />}>
            {renderModalRoute(
              '/profile/orders/:number',
              <OrderInfo />,
              `#${location.pathname.match(/\d+/)}`,
              () => navigate('/profile/orders')
            )}
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
