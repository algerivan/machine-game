import { useEffect, useState } from "react";

interface OuterItemProps {
  size: number;
}

const OuterItem = ({ size }: OuterItemProps) => {
  const [color, setColor] = useState<string>("#000000");

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    setColor(generateRandomColor());
  }, []);

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
      }}
      className="col-span-1 row-span-1"
    />
  );
};

export default OuterItem;
