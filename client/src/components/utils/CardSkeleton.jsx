import React from "react";

function CardSkeleton() {
  return (
    <ul>
      {[1, 2, 3].map((item) => (
        <li
          key={item}
          className="p-2 m-2 border border-transparent rounded-md ms-0 backdrop-blur-sm animate-pulse"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-1 space-y-2">
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
              <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
            </div>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CardSkeleton;
