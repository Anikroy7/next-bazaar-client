"use client";
import React from "react";

import First from "@/src/components/compare/First";
import Second from "@/src/components/compare/Second";
import Third from "@/src/components/compare/Third";

const ProductComparisonPage = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-wrap justify-between gap-6">
        <div className="flex-1 min-w-[300px]">
          <First />
        </div>

        <div className="flex-1 min-w-[300px]">
          <Second />
        </div>

        <div className="flex-1 min-w-[300px]">
          <Third />
        </div>
      </div>
    </div>
  );
};

export default ProductComparisonPage;
