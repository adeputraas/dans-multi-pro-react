import React, {useState} from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Header from './components/nav/Header';
import HomeDetail from './pages/HomeDetail';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/home" element={<Header />}>
      <Route index element={<Home />} />
      <Route path=":idJobs" element={<HomeDetail />} />
    </Route>
  )
)

function App({routes}) {

  const [isAuthenticated, setToken] = useState(localStorage.getItem('token'));

  if(!isAuthenticated) {
    return <Login setToken={setToken} />
  }

  return (
    <>

      <RouterProvider router={router}/>
    </>
  );
}

export default App;
