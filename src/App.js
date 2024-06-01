import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Search from './components/Search'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <Route exact path="/search" component={Search} />
    <ProtectedRoute exact path="/my-profile" component={MyProfile} />
    <ProtectedRoute exact path="/users/:userId" component={UserProfile} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
