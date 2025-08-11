import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login.jsx'
import Dashboard from './pages/Dashboard.jsx';
import Register from './pages/register.jsx'
import ProtectedRoute from './components/Route/protectedRoute.jsx';
import SkillView from './pages/SkillView.jsx';
import DetailSkill from './pages/DetailSkill.jsx';
import EditSkill from './components/Section/EditSkill.jsx';
import User from './pages/User.jsx';
import PublicRoute from './components/Route/PublicRoute.jsx';
import AddResource from './pages/AddResource.jsx';
import EditResources from './pages/EditResources.jsx';
import AddSkill from './pages/AddSkill.jsx';
function App() {
 

  return (
   <Router>
    <Routes>
      <Route path='/register' element={
        <PublicRoute>
          <Register/>
        </PublicRoute>
        } />
      <Route path='/' element={
        <PublicRoute>
          <Login/>
        </PublicRoute>
        } />
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path='/skills' element={
        <ProtectedRoute>
          <SkillView />
        </ProtectedRoute>
      } />
      <Route path='/addskill' element={
        <ProtectedRoute>
          <AddSkill />
        </ProtectedRoute>
      } />
       <Route path='/skill/:id' element={
        <ProtectedRoute>
          <DetailSkill />
        </ProtectedRoute>
      } />
      <Route path='/addresource/:id' element={
         <ProtectedRoute>
          <AddResource/>
         </ProtectedRoute>
      }
      />
       <Route path='/editresource/:id' element={
         <ProtectedRoute>
          <EditResources/>
         </ProtectedRoute>
      }
      />
       <Route path='/edit/:id' element={
        <ProtectedRoute>
          <EditSkill />
        </ProtectedRoute>
      } />
       <Route path='/user/:id' element={
        <ProtectedRoute>
          <User />
        </ProtectedRoute>
      } />
    </Routes>
   </Router>
  )
}

export default App
