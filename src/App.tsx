import style from './App.module.scss';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/navbar/navbar';
import LoginInfo from './components/login/login_info';
import { Suspense, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { InitializedAppTC, ThunkAppType } from './redux/appReducer';
import Preloader from './components/other/preloader/preloader';
import HomePage from './components/home/HomePage';
import NotFoundPage from './components/not_found_page/NotFoundPage';
import SettingsContainer from './components/settings/SettingsContainer';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/other/errorFallback/ErrorFallback';
import Footer from './components/footer/Footer';
import { initializedApp } from './redux/appSelectors';
import { AnyAction } from 'redux';
import Header from './components/header/Header';
import Profile from './components/profile/Profile';


const DialogsContainer = React.lazy(() => import('./components/dialogs/DialogsContainer'));
const Users = React.lazy(() => import('./components/users/Users'));
const NewsContainer = React.lazy(() => import('./components/news/NewsContainer'));
const MusicContainer = React.lazy(() => import('./components/music/MusicContainer'));



const App: React.FC = (props) => {

  const initialized = useSelector(initializedApp)

  const dispatch = useDispatch()

  useEffect(() => {
    const action = InitializedAppTC()
    dispatch(action as ThunkAppType & AnyAction);
  }, [])

  if (!initialized) {
    return <Preloader />
  }

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.body}>
          <div className={style.header}>
            <Header />
          </div>
          <div className={style.navigation}>
            <Navigation />
          </div>
          <div className={style.content}>
            <Suspense fallback={<Preloader />}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/profile/:userID' element={<Profile />} />
                  <Route path='/profile/' element={<Profile />} />
                  <Route path='/dialogs/*' element={<DialogsContainer />} />
                  <Route path='/users/' element={<Users />} />
                  <Route path='/login/' element={<LoginInfo />} />
                  <Route path='/news/' element={<NewsContainer />} />
                  <Route path='/music/' element={<MusicContainer />} />
                  <Route path='/settings/' element={<SettingsContainer />} />
                  <Route path='*' element={<NotFoundPage />} />
                </Routes>
              </ErrorBoundary>
            </Suspense>
          </div>
          <div className={style.footer}>
            <Footer />
          </div>
        </div>
      </div>
    </div >
  );
}



export default App
