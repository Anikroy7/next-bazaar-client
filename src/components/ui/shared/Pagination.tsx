"use client";
import { Pagination } from "@nextui-org/pagination";

export default function PaginationComponent({
  setSelectedPageNumber,
  selectedPageNumber,
  total,
}: {
  selectedPageNumber: number;
  total: number;
  setSelectedPageNumber: (page: number) => void;
}) {
  return (
    <Pagination
      showControls
      initialPage={selectedPageNumber}
      total={total}
      onChange={(page: number) => setSelectedPageNumber(page)}
    />
  );
}
