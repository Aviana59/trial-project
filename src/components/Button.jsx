/* eslint-disable react/prop-types */

const Button = ({ type = 'button', className, children, onClick }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`px-4 py-2 bg-primary text-white rounded hover:bg-pink-800 transition ${className}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;