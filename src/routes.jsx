import { useRoutes} from 'react-router-dom'
import Home from './pages/home/screens/Home'
import NotFound from './pages/Errors/screens/NotFound';
import MainLayout from './MainLayout';
import Login from './pages/Login/screens/Login';

const PublicRoutes = [

  { path: '401', element: <NotFound status='401' /> },
  { path: '/', element: <Login /> },

  {
    path: '/',
    element: <MainLayout />, 
    children: [
      { path: 'home', element: <Home /> },
      { path: '404', element: <NotFound status='404' /> },
      { path: '500', element: <NotFound status='500' /> },
      { path: '*', element: <NotFound status='404' /> },
    ],
  },


]

export default function Routes() {
  const allRoutes = [...PublicRoutes];
  return useRoutes(allRoutes)
}


