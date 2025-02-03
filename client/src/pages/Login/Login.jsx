import Logo from '../../components/Logo';
import GoogleImage from '../../assets/Google-img.svg';
import AppleImage from '../../assets/appleimg.svg';
import { Link } from 'react-router-dom';
import FormFooter from '../../components/FormFooter';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { isUserLoggedInAtom } from '../../redux/Store';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setUserLoggedIn] = useAtom(isUserLoggedInAtom);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: Implement login logic here
    if(!email ||!password){
      return alert("Please fill all fields")
    }else {
      // TODO: Redirect to home page after successful login
      window.location.href = '/';
      setUserLoggedIn(true); // Set user logged in state
    }
  }

  return (
    <div className='bg-[#F6F7FA] w-full'>
      <div>
        <Logo />
      </div>
      <div className='bg-[#ffffff] w-[420px] px-[50px] flex flex-col m-auto rounded-[19px]'>
        <h2 className='font-bold text-[44px] text-start mt-[45px] mb-[40px]'>Sign in</h2>
        <form className='flex flex-col'>
          <div className="mb-[24px]">
            <label className='block mb-2 text-[16px] font-medium'>
              Email address
            </label>
            <input
              type='email'
              id='email'
              placeholder='eg. john@gmail.com'
              className='w-full px-4 py-2 bg-[#F6F7FA] outline-none rounded-[13px] text-[16px]'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-[24px]">
            <label className='block mb-2 text-[16px] font-medium'>
              Password
            </label>
            <input
              type='password'
              id='password'
              placeholder='•••••••••••'
              className='w-full px-4 py-2 bg-[#F6F7FA] outline-none rounded-[13px] text-[16px]'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={handleSubmit} className='w-full py-2 font-medium text-white mb-[40px] bg-[#06C569] rounded-[13px]'>
            Sign in
          </button>
        </form>

        <div className='flex items-center justify-center'>
          <div className='h-px w-full bg-gray-300'></div>
          <span className='px-3 text-nowrap text-[14px] text-gray-500'>Or sign in with</span>
          <div className='h-px w-full bg-gray-300'></div>
        </div>

        <div className='flex justify-center mt-6 gap-2 mb-[40px]'>
          <button className='flex items-center justify-center w-[100%] h-10 bg-gray-100 rounded-[10px] hover:bg-gray-200'>
            <img src={GoogleImage} alt='Google' />
          </button>
          <button className='flex items-center justify-center w-[100%] h-10 bg-gray-100 rounded-[10px] hover:bg-gray-200'>
            <img src={AppleImage} alt='Apple' />
          </button>
        </div>

        <div className='mb-[45px] font-medium'>
          <p>Don’t have an account? <Link to="/signup" className='text-[#06C569]'>Sign up</Link></p>
        </div>
      </div>

      <FormFooter />
    </div>
  )
}

export default Login
