import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import useAuth from '../../../hooks/useAuth'
import { imageUpload, saveOrUpdateUser } from '../../../utils'
import Logo from '../../../Components/Logo/Logo'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import { TbFidgetSpinner } from 'react-icons/tb'

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()


  if (user) return <Navigate to={from} replace={true} />

  // console.log(watch("name")); // watch input value by passing the name of it
  console.log(errors)
  const onSubmit = async (data) => {
    const { name, image, email, password , role } = data;
    const imageFile = image[0];
    console.log("data: ", data);
    
    try {
      //1. Upload Image to imgbb
      const imageURL = await imageUpload(imageFile);
      console.log(imageURL)
      //2. User Registration
      const result = await createUser(email, password , role)

      // await saveOrUpdateUser({
      //   name,
      //   email,
      //   // role: 'customer',
      //   image: await imageURL
      // });

      //3. Save username & profile photo
      await updateUserProfile(
        name,
        await imageURL
      )
      console.log(result)

      navigate(from, { replace: true })
      toast.success('Registration Successful')
      console.log(result);
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  // Handle Google Signin


  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      const { user } = await signInWithGoogle()

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: await user?.photoURL,
      });

      navigate(from, { replace: true })
      toast.success('Registration Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }
  return (
    <div className='flex justify-end items-center min-h-screen w-10/12 mx-auto py-10'>
      <div className='mx-auto w-5/12 flex items-center gap-2'>
        <h2 className='font-bold text-2xl text-primary'>Register to</h2> <Logo></Logo>
      </div>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Register</h1>
          <p className='text-sm text-gray-400'>Welcome to TailorFlow</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
                {...register('name', {
                  required: 'Name is required',
                  maxLength: {
                    value: 20,
                    message: 'Name must be less than 20 characters'
                  }
                })}
              />
              {errors.name && (<div className="text-red-600 mt-1 text-sm">{errors.name.message}
              </div>)}
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                id='email'
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Entered value does not match email format',
                  }
                })}
              />
              {errors.email && (<div className="text-red-600 mt-1 text-sm">{errors.email.message}
              </div>)}
            </div>
            {/* Image */}
            <div>
              <label
                htmlFor='image'
                className='block mb-2 text-sm font-medium text-gray-700'
              >
                Profile Photo
              </label>
              <input
                type='file'
                id='image'
                accept='image/*'
                className='block w-full text-sm text-gray-500
      file:mx-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-secondary file:text-primary/70
      hover:file:bg-secondary/50
      bg-gray-100 border border-dashed border-primary/30 rounded-md cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-primary
      py-2'
                {...register('image')}
              />
              <p className='mt-1 text-xs text-gray-400'>
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>
            <div className="w-full">
              {/* choose role */}
              <label className="label text-gray-700">Choose role</label>
              <select
                defaultValue="Pick Role"
                className="select w-full outline-0 mt-2 border border-gray-300 p-2 rounded"
                {...register("role", { required: "Role is required" })}
              >
                <option disabled={true}>Pick Role</option>
                <option>Buyer</option>
                <option>Manager</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                autoComplete='new-password'
                id='password'
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                {...register('password', {
                  required: 'Password is required', minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long'
                  },
                  maxLength: {
                    value: 20,
                    message: 'Password must be less than 20 characters long'
                  },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    message: 'Password must have uppercase, lowercase, number and special characters'
                  }
                })}
              />
              {errors.password && (<div className="text-red-600 mt-1 text-sm">{errors.password.message}
              </div>)}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='btn btn-primary w-full rounded-md py-6 text-white'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : 
              (
                'Register'
              )}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Register with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 rounded-md cursor-pointer'
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='auth/login'
            className='hover:underline hover:text-primary/60 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Register
