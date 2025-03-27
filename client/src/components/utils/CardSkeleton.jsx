import React from "react";

function CardSkeleton() {
  return (
    <ul>
      {[1, 2, 3].map((item) => (
        <li
          key={item}
          className="px-2 py-4 m-2 border border-transparent rounded-md ms-0 backdrop-blur-sm animate-pulse"
        >
          <div className="flex items-center space-x-4">
            <div className="w-6 h-6 rounded ms-1 bg-white/10"></div>
            <div className="flex-1 space-y-2">
              <div className="w-1/2 h-3 rounded bg-white/10"></div>
              <div className="w-3/4 h-4 rounded bg-white/10"></div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10"></div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CardSkeleton;
