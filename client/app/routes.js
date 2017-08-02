import Base from './components/Base.jsx';
import Logout from './components/Logout.jsx'
import HomePage from './containers/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import Dashboard from './containers/Dashboard.jsx';

const routes = [
  {
    component: Base,
    routes:[
      {
        path: '/voting-app/',
        exact: true,
        component: HomePage
      },
      {
        path: '/voting-app/login',
        component: LoginPage
      },
      {
        path: '/voting-app/signup',
        component: SignUpPage
      },
      {
        path: '/voting-app/dashboard',
        component: Dashboard
      },
      {
        path: '/voting-app/logout',
        component: Logout
      },
    ]
  }
]

export default routes;