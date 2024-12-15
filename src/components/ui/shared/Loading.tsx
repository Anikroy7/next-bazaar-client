"use client";

import { CSSProperties } from "react";
import GridLoader from "react-spinners/GridLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loading() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Loading Overlay */}
      <div className="absolute inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
        <div className="text-center">
          <GridLoader
            aria-label="Loading Spinner"
            color={"#3498db"}
            cssOverride={override}
            data-testid="loader"
            loading={true}
            size={20}
          />
          <p className="text-white mt-4 font-medium text-lg">
            Loading, please wait...
          </p>
        </div>
      </div>
    </div>
  );
}

export default Loading;
