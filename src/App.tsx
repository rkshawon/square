import { useState, useEffect } from "react";

// Rectangle props
interface RectangleProps {
  size: number;
  x: number;
  y: number;
}

// Single rectangle component
function Rectangle({ size, x, y }: RectangleProps) {
  const [broken, setBroken] = useState(false);

  if (!broken) {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          setBroken(true);
        }}
        className="bg-red-400 cursor-pointer absolute"
        style={{
          width: size,
          height: size,
          border: "1px solid white",
          boxSizing: "border-box",
          top: y,
          left: x,
        }}
      />
    );
  }

  const newSize = size / 2;

  return (
    <div
      className="grid grid-cols-2 grid-rows-2 gap-0 absolute"
      style={{
        width: size,
        height: size,
        top: y,
        left: x,
      }}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-red-400 cursor-pointer"
          style={{
            width: newSize,
            height: newSize,
            border: "1px solid white",
            boxSizing: "border-box",
          }}
        />
      ))}
    </div>
  );
}

interface RectangleItem {
  id: number;
  x: number;
  y: number;
}

interface CrosshairProps {
  setArr: React.Dispatch<React.SetStateAction<RectangleItem[]>>;
}

// Crosshair component
const Crosshair: React.FC<CrosshairProps> = ({ setArr }) => {
  const handleClick = (e: MouseEvent) => {
    setArr((prev) => [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }]);
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
};

// Main App
const App: React.FC = () => {
  const [arr, setArr] = useState<RectangleItem[]>([]);

  return (
    <>
      <Crosshair setArr={setArr} />
      {arr.map((item) => (
        <Rectangle key={item.id} size={40} x={item.x} y={item.y} />
      ))}
    </>
  );
};

export default App;
