import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './layout.jsx'
import About from './components/about_us/about.jsx'
import Home from './components/home/home.jsx'
import Contact from './components/contact_us/contact.jsx'
import User from './user/user.jsx'
import Github , {GithubInfoLoader} from './github/github.jsx' 





// const router = createBrowserRouter([
//   {path : '/',
//   element : <Layout/>,
//   children : [
//     {
//       path : '',
//       element : <Home/>
//     }, {
//       path : 'about',
//       element : <About/>
//     }, {
//       path : '/contact',
//       element : <Contact/>
//     }
//   ]
// }
// ])

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path = '/user/:userid' element = {<User/>}/>
      <Route
      loader = {GithubInfoLoader}
      path = 'github' element = {<Github/>}/>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
