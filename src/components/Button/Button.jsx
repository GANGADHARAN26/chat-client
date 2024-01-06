
const Button = ({
    // eslint-disable-next-line react/prop-types
    label='Button',type='button',className='',disabled=false,
}) => {
   
  return (
    <button type={type} className={`text-white h-10 bg-primary hover:bg-primary focus:ring-4 focus:outline-none
    focus:ring-blue-300 font-small rounded-lg text-lg   px-2.5 text-center ${className}
    `} disabled={disabled} >{label}</button>
  )
}

export default Button