import { useEffect, useState } from "react";

interface OuterItemProps {
  size: number;
  activeIndex: number;
  indice: number;
}

const OuterItem = ({ size, activeIndex, indice }: OuterItemProps) => {
  const [color, setColor] = useState<string>("#000000");

  const generateRandomColor = () => {
    if (activeIndex === indice) return "#FFFFFF";

    return "red";
  };

  useEffect(() => {
    setColor(generateRandomColor());
  }, [activeIndex]);

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
      }}
      className="col-span-1 row-span-1"
    >
      {indice}
    </div>
  );
};

export default OuterItem;
