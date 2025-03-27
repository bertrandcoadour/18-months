import React from "react";

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-baseline">
        <h3 className="font-semibold  py-2 px-1">Loading</h3>
        <div className="flex flex-row gap-1 ">
          <div className="animate-ping rounded-full  w-1 border-t-2 border-b-2"></div>
          <div className="animate-ping rounded-full  w-1 border-t-2 border-b-2"></div>
          <div className="animate-ping rounded-full  w-1 border-t-2 border-b-2"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
