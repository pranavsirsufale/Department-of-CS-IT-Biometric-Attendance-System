import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import {Home, About, Contact,User,Github, githubInfoLoader} from './components'
<<<<<<< HEAD
import {University, Discipline, Department, AcademicLevel, Program, AcademicTimeline, Subject, Staff, Student, Login, Dashboard, 
  Timetable, TeacherSessions} from './components/Pages'
=======
import {University, Discipline, Department, AcademicLevel, Program, AcademicTimeline, Subject, Staff, Student} from './components/Pages'
>>>>>>> 86c5c22 (add backend and frontend logic)


const router = createBrowserRouter(
createRoutesFromElements(
  <Route path='/' element={<Layout/>} >
    <Route path='' element={<Home/>} />
    <Route path='university' element={<University/>}/>
    <Route path='discipline' element={<Discipline/>}/>
    <Route path='department' element={<Department/>}/>
    <Route path='academic-level' element={<AcademicLevel/>}/>
    <Route path='program' element={<Program/>}/>
    <Route path='academic-timeline' element={<AcademicTimeline/>}/>
    <Route path='class-type' element={<Subject/>}/>
    <Route path='staff' element={<Staff/>}/>
    <Route path='student' element={<Student/>}/>
<<<<<<< HEAD
    <Route path='login' element={<Login/>}/>
    <Route path='dashboard' element={<Dashboard/>}/>
    <Route path='timetable' element={<Timetable/>}/>
    <Route path='teacher-session' element={<TeacherSessions/>}/>
=======
>>>>>>> 86c5c22 (add backend and frontend logic)
    <Route path='about'  >
      <Route path='' element={<About/>} />
      <Route path='user' element={<User/>} />
    </Route>
    <Route path='user' element={<User/>} />
    <Route path='contactus' element={<Contact/>} />
    <Route path='github' element={<Github/>} loader={githubInfoLoader} />
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)