import React from "react";

type props = {
  text: string;
  action: any;
};

const Button = ({ text, action }: props) => {
  return (
    <button className="hover:scale-105 transition duration-300 ease-in-out active:bg-cyan-600 bg-primary px-4 py-2 md:px-6 md:py-2 text-white rounded-lg text-sm shadow-md" onClick={action}>
      {text}
    </button>
  );
};

export default Button;
