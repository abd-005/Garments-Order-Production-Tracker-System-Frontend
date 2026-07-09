import logo from '../../assets/logo.png'

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <img
        src={logo}
        alt="Loading..."
        className="size-20 animate-spin object-contain"
      />
    </div>
  )
}

export default LoadingSpinner
