"use client";

import { Fragment, useEffect, useState } from "react";
//* Hooks
import { useWindowSize } from "@/hooks/useWindowSize";
//* Components
import OuterItem from "./components/OuterItem";

const HomePage = () => {
  const { height } = useWindowSize();
  const [itemSize, setItemSize] = useState<number>(0);
  const [gridSize, setGridSize] = useState<number>(0);

  useEffect(() => {
    const newSize = height ? height / 9 : 0;
    const newGridSize = newSize * 7;

    setItemSize(newSize);
    setGridSize(newGridSize);
  }, [height]);

  return (
    <div
      className="grid-rows-7 grid grid-cols-7 gap-0"
      style={{
        height: `${gridSize}px`,
        width: `${gridSize}px`,
        minWidth: `${gridSize}px`,
      }}
    >
      {/* Fila superior */}
      {Array.from(Array(7)).map((_, i) => (
        <OuterItem key={i} size={itemSize} />
      ))}

      {/* Filas intermedias */}
      {Array.from(Array(5)).map((_, i) => (
        <Fragment key={i}>
          {/* Elementos laterales */}
          <OuterItem size={itemSize} />
          {/* Elementos del centro */}
          {Array.from(Array(5)).map((_, j) => (
            <div
              key={`${i}-${j}`}
              className="col-span-1 row-span-1 bg-gray-500"
              style={{
                width: `${itemSize}px`,
                height: `${itemSize}px`,
              }}
            ></div>
          ))}
          {/* Elementos laterales */}
          <OuterItem size={itemSize} />
        </Fragment>
      ))}

      {/* Fila inferior */}
      {Array.from(Array(7)).map((_, i) => (
        <OuterItem key={i} size={itemSize} />
      ))}
    </div>
  );
};

export default HomePage;
