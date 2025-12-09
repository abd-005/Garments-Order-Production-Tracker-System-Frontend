// src/pages/Login.jsx
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import useAuth from '../../../hooks/useAuth';
import { saveOrUpdateUser } from '../../../utils';
import Logo from '../../../Components/Logo/Logo';

const Login = () => {
  const { signIn, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
      toast.success('Login Successful');
    } catch (err) {
      console.log(err)
      toast.error('Invalid email or password');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        role: 'buyer',
        status: 'pending',
        image: user?.photoURL,
      });

      navigate(from, { replace: true });
      toast.success('Login Successful');
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="min-h-screen bg-light flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-lg p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold text-primary">Login to</h2>
            <Logo />
          </div>
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
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
