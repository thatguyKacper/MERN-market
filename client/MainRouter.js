import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import PrivateRoute from './auth/PrivateRoute';
import EditProfile from './user/EditProfile';
import Users from './user/Users';
import Signup from './user/Signup';
import Signin from './auth/Signin';
import Profile from './user/Profile';
import NewShop from './shop/NewShop';
import MyShops from './shop/MyShops';

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/user/edit/:userId' element={<PrivateRoute />}>
          <Route path='/user/edit/:userId' element={<EditProfile />} />
        </Route>
        <Route path='/user/:userId' element={<Profile />} />

        <Route path='/seller/shop/new' element={<PrivateRoute />}>
          <Route path='/seller/shop/new' element={<NewShop />} />
        </Route>
        <Route path='/seller/shops' element={<PrivateRoute />}>
          <Route path='/seller/shops' element={<MyShops />} />
        </Route>
      </Routes>
    </div>
  );
};
export default MainRouter;
