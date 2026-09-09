import React from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { toast, ToastBar } from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import useAuth from '../../../hooks/useAuth';
import { saveOrUpdateUser } from '../../../utils';
import Logo from '../../../components/Logo/Logo';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
      <Card className="w-full max-w-lg gap-0 rounded-lg border-0 p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Login</h1>
          <p className="text-sm text-gray-500 mt-2">Welcome back to TailorFlow</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="email" className="mb-2 block text-base-content/80">Email address</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter Your Email Here"
              className="h-12 rounded-lg bg-base-100"
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
            <Label htmlFor="password" className="mb-2 block text-base-content/80">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="*******"
              className="h-12 rounded-lg bg-base-100"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <Button
            type="submit"
            className="h-12 w-full rounded-lg"
          >
            {loading ? <TbFidgetSpinner className="animate-spin" /> : 'Login'}
          </Button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-500">Login with social accounts</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <Button
          onClick={handleGoogleSignIn}
          variant="outline"
          className="h-12 w-full rounded-lg"
        >
          <FcGoogle size={24} />
          <span>Continue with Google</span>
        </Button>

        {/* Demo Login Section */}
        <div className="mt-6 border-t pt-6">
          <p className="text-sm text-gray-500 mb-3">Quick Demo Access:</p>
          <div className="grid grid-cols-3 gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => handleDemoLogin('user')}
              disabled={demoLoading}
              className="bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:opacity-50"
            >
              Demo User
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => handleDemoLogin('admin')}
              disabled={demoLoading}
              className="bg-purple-100 text-purple-700 hover:bg-purple-200 disabled:opacity-50"
            >
              Demo Admin
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => handleDemoLogin('manager')}
              disabled={demoLoading}
              className="bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50"
            >
              Demo Manager
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="auth/register" className="text-primary hover:underline">Register</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
