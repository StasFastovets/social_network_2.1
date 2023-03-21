import logo from './logo.svg';
import './App.css';
import { Route, Routes, useHistory } from 'react-router-dom';
import HeaderContainer from './components/header/HeaderContainer';
import Navigation from './components/navbar/navbar';
import ProfileContainer from './components/profile/ProfileContainer';
import LoginInfo from './components/login/login_info';
import { Suspense, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { InitializedAppTC } from './redux/appReducer';
import Preloader from './components/other/preloader/preloader';
import HomePage from './components/home/HomePage';
import NotFoundPage from './components/not_found_page/NotFoundPage';
import SettingsContainer from './components/settings/SettingsContainer';
import React from 'react';

const DialogsContainer = React.lazy(() => import('./components/dialogs//DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/users/UsersContainer'));
const NewsContainer = React.lazy(() => import('./components/news/NewsContainer'));
const MusicContainer = React.lazy(() => import('./components/music/MusicContainer'));

const App = (props) => {

  useEffect(() => {
    props.InitializedAppTC()
  }, [])

  if (!props.initialized) {
    return <Preloader />
  }

  return (
    <div className='app-wrapper'>
      <HeaderContainer />
      <div className='navigation-app'>
        <Navigation />
      </div>
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile/:userID' element={<ProfileContainer />} />
          <Route path='/profile/' element={<ProfileContainer />} />
          <Route path='/dialogs/*' element={<DialogsContainer />} />
          <Route path='/users/' element={<UsersContainer />} />
          <Route path='/login/' element={<LoginInfo />} />
          <Route path='/news/' element={<NewsContainer />} />
          <Route path='/music/' element={<MusicContainer />} />
          <Route path='/settings/' element={<SettingsContainer />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div >
  );
}


let mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
}

const AppContainer = connect(mapStateToProps, { InitializedAppTC })(App)

export default AppContainer;
