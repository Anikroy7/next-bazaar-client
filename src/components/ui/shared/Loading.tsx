"use client"

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
            <div
                className="absolute inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm"
            >
                <div className="text-center">
                    <GridLoader

                        color={'#3498db'}
                        loading={true}
                        cssOverride={override}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    <p className="text-white mt-4 font-medium text-lg">Loading, please wait...</p>
                </div>
            </div>
        </div>

    );
}

export default Loading;
