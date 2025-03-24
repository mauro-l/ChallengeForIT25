import React from "react";

function ButtonForm({ children, onClick }) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 px-4 py-1 my-3 text-sm border border-transparent rounded-md select-none bg-white/15 backdrop-blur-sm"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonForm;
