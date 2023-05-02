"use client";

import { Fragment, useEffect, useState, useRef } from "react";
//* Hooks
import { useWindowSize } from "@/hooks/useWindowSize";
//* Components
import OuterItem from "./components/OuterItem";

const GRID_SIZE = 7;
const totalOuterItems = GRID_SIZE * 4 - 4;

const generateOuterIndex = (i: number, j: number): number => {
  if (i === 0) return j + 1;
  if (i === GRID_SIZE - 1) return totalOuterItems - (GRID_SIZE - 2) - j;
  if (j === 0) return totalOuterItems - i + 1;
  if (j === GRID_SIZE - 1) return GRID_SIZE + i;

  return -1;
};

const HomePage = () => {
  const { height } = useWindowSize();
  const [itemSize, setItemSize] = useState<number>(0);
  const [gridSize, setGridSize] = useState<number>(0);
  const [gridIndex, setGridIndex] = useState<number>(0);
  const [loopCount, setLoopCount] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);
  const [intervalTimeOut, setIntervalTimeOut] = useState<number>(30);

  const randomIndexRef = useRef<number>(
    Math.floor(Math.random() * totalOuterItems)
  );

  const randomFinishLoop = useRef<number>(
    Math.floor(totalOuterItems * 3 + Math.random() * 10)
  );

  const getDistanceFromIndex = (current: number): number => {
    const distance = randomIndexRef.current - current;

    return distance < 0 ? distance + totalOuterItems : distance;
  };

  // intervalo de tiempo para cambiar el indice
  useEffect(() => {
    const interval = setInterval(() => {
      // Verificar si el índice ha recorrido todos los elementos dos veces
      if (loopCount <= randomFinishLoop.current) {
        setGridIndex((prev) => (prev + 1) % (totalOuterItems + 1));
        // Incrementar el índice de bucle en 1 cada vez que se cambia de índice
        setLoopCount((prev) => prev + 1);
      } else {
        setIntervalTimeOut(50);
        if (getDistanceFromIndex(gridIndex) !== 1) {
          if (getDistanceFromIndex(gridIndex) === 1) {
            setIntervalTimeOut(1500);
            setGridIndex((prev) => (prev + 1) % (totalOuterItems + 1));
          } else if (getDistanceFromIndex(gridIndex) < 3) {
            setIntervalTimeOut(1000);
            setGridIndex((prev) => (prev + 1) % (totalOuterItems + 1));
          } else if (getDistanceFromIndex(gridIndex) < 5) {
            setIntervalTimeOut(600);
            setGridIndex((prev) => (prev + 1) % (totalOuterItems + 1));
          } else if (getDistanceFromIndex(gridIndex) < 8) {
            setIntervalTimeOut(400);
            setGridIndex((prev) => (prev + 1) % (totalOuterItems + 1));
          } else if (getDistanceFromIndex(gridIndex) < 10) {
            setIntervalTimeOut(300);
            setGridIndex((prev) => (prev + 1) % (totalOuterItems + 1));
          } else {
            setIntervalTimeOut(100);
            setGridIndex((prev) => (prev + 1) % (totalOuterItems + 1));
          }
        } else {
          setFinished(true);
          setGridIndex(randomIndexRef.current);
        }
      }
    }, intervalTimeOut);

    if (finished) clearInterval(interval);

    return () => clearInterval(interval);
  }, [loopCount, finished, gridIndex, intervalTimeOut]);

  useEffect(() => {
    const newSize = height ? height / (GRID_SIZE + 2) : 0;
    const newGridSize = newSize * GRID_SIZE;

    setItemSize(newSize);
    setGridSize(newGridSize);
  }, [height]);

  if (!itemSize || !gridSize) return <div>Loading...</div>;

  return (
    <div
      className="grid gap-0"
      style={{
        height: `${gridSize}px`,
        width: `${gridSize}px`,
        minWidth: `${gridSize}px`,
        gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
      }}
    >
      {/* Fila superior */}
      {Array.from(Array(GRID_SIZE)).map((_, i) => (
        <OuterItem
          key={i}
          size={itemSize}
          indice={generateOuterIndex(0, i)}
          activeIndex={gridIndex}
        />
      ))}

      {/* Filas intermedias */}
      {Array.from(Array(GRID_SIZE - 2)).map((_, i) => (
        <Fragment key={i}>
          {/* Elementos laterales */}
          <OuterItem
            indice={generateOuterIndex(i + 1, 0)}
            size={itemSize}
            activeIndex={gridIndex}
          />
          {/* Elementos del centro */}
          {Array.from(Array(GRID_SIZE - 2)).map((_, j) => (
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
          <OuterItem
            indice={generateOuterIndex(i + 1, GRID_SIZE - 1)}
            size={itemSize}
            activeIndex={gridIndex}
          />
        </Fragment>
      ))}

      {/* Fila inferior */}
      {Array.from(Array(GRID_SIZE)).map((_, i) => (
        <OuterItem
          key={i}
          indice={generateOuterIndex(GRID_SIZE - 1, i)}
          size={itemSize}
          activeIndex={gridIndex}
        />
      ))}
    </div>
  );
};

export default HomePage;
