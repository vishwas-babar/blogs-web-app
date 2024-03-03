import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import authService, { AuthService } from './appwrite/auth';
import { loginUser, logoutUser } from './store/userSlice';
import { TopNav } from './components/index.js';
import PostCard from './components/PostCard.jsx';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {

    // check if user is logged in or not
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(loginUser(userData))
        } else {
          dispatch(logoutUser())
        }
      })
      .finally(() => setLoading(false))
  }, [])


  // return loading ? (
  //   <>
  //     <TopNav />
  //     <h1>This is react project</h1>
  //   </>
  // ) : null

  return (
    <>
      {/* <PostCard /> */}
      <div className=' h-screen w-full flex items-center justify-center'>
        <h1 className='mt-20'>This is react project</h1>
      </div>
    </>
  )
}

export default App
