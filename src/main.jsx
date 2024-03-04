import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { LoginPage, SignupPage, Layout, CreatePost, MyPosts, EditPost, Home, MyProfile, PostPage } from "./pages/pages.js"
import { Protected } from './components/index.js'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Protected authentication={false} ><Home /></Protected>} />
        <Route path='/add-post' element={<Protected authentication={true} ><CreatePost /></Protected>} />
        <Route path='/my-posts' element={<Protected authentication={true} ><MyPosts /></Protected>} />
        <Route path='/edit-post/:id' element={<Protected authentication={true} ><EditPost /></Protected>} />
        <Route path='/my-profile' element={<Protected authentication={true} ><MyProfile /></Protected>} />
        <Route path='/login' element={<Protected authentication={false} ><LoginPage /></Protected>} />
        <Route path='/signup' element={<Protected authentication={false} ><SignupPage /></Protected>} />
        <Route path='/post/:id' element={<Protected authentication={true} ><PostPage /></Protected>} />
      </Route>
    </>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
)
