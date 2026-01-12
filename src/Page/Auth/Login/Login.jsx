import React from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { toast, ToastBar } from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import useAuth from '../../../hooks/useAuth';
import { saveOrUpdateUser } from '../../../utils';
import Logo from '../../../Components/Logo/Logo';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const Login = () => {
  const { signIn, signInWithGoogle, user ,loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || '/';
  const [demoLoading, setDemoLoading] = React.useState(false);

  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  

  if (user) return <Navigate to={from} replace={true} />

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const {user} = await signIn(email, password);
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })
      navigate(from, { replace: true });
      toast.success('Login Successful');
    } catch (err) {
      console.log(err)
      toast.error('Invalid email or password');
    }
  };

  const handleDemoLogin = async (role) => {
    setDemoLoading(true);
    // Demo credentials for different roles
    const demoCredentials = {
      user: { email: 'user@demo.com', password: 'Demo@1234' },
      admin: { email: 'admin@demo.com', password: 'Demo@1234' },
      manager: { email: 'manager@demo.com', password: 'Demo@1234' }
    };

    const credentials = demoCredentials[role] || demoCredentials.user;
    setValue('email', credentials.email);
    setValue('password', credentials.password);

    setTimeout(() => {
      setDemoLoading(false);
      toast.success(`Demo ${role} credentials filled. Click Login to continue.`);
    }, 500);
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      navigate(from, { replace: true });
      toast.success('Login Successful');
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-end items-center min-h-screen w-10/12 mx-auto py-10">
      <div className='mx-auto w-5/12 flex items-center gap-2'>
            <h2 className='font-bold text-2xl text-primary'>Login to</h2> <Logo></Logo>
        </div>
      <div className="w-full max-w-lg bg-white shadow-xl rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Login</h1>
          <p className="text-sm text-gray-500 mt-2">Welcome back to TailorFlow</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email Here"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 text-gray-900"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email format'
                }
              })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="*******"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 text-gray-900"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/80 transition duration-200 flex items-center justify-center"
          >
            {loading ? <TbFidgetSpinner className="animate-spin" /> : 'Login'}
          </button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-500">Login with social accounts</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition duration-200"
        >
          <FcGoogle size={24} />
          <span>Continue with Google</span>
        </button>

        {/* Demo Login Section */}
        <div className="mt-6 border-t pt-6">
          <p className="text-sm text-gray-500 mb-3">Quick Demo Access:</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('user')}
              disabled={demoLoading}
              className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition disabled:opacity-50"
            >
              Demo User
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              disabled={demoLoading}
              className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-200 transition disabled:opacity-50"
            >
              Demo Admin
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('manager')}
              disabled={demoLoading}
              className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition disabled:opacity-50"
            >
              Demo Manager
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="auth/register" className="text-primary hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
