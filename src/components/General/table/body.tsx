import { useRef, useEffect, useState } from "react";
import { Table } from "@mantine/core";
import TanHeader from "./header";
import TanRows from "./rows";
import { Table as ReactTable } from "@tanstack/react-table";
import { TableRowData } from "../../../types";

export type TableInstance = ReactTable<TableRowData>;

interface TanBodyProps {
  table: TableInstance;
  loadingState?: boolean;
  onClick?: () => void;
}

const TanBody = ({ table, onClick }: TanBodyProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - scrollContainer.offsetLeft);
      setScrollLeft(scrollContainer.scrollLeft);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    scrollContainer.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      scrollContainer.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, startX, scrollLeft]);

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={scrollContainerRef}
        className={`w-full overflow-x-auto ${
          isDragging ? "cursor-grabbing" : "cursor-default"
        }`}
      >
        <Table style={{ width: "100%" }}>
          <TanHeader table={table} />
          <TanRows table={table} onClick={onClick} />
        </Table>
      </div>
    </div>
  );
};

export default TanBody;
