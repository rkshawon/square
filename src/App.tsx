import { useState, useEffect } from "react";

function Rectangle({ size }: { size: number }) {
  const [broken, setBroken] = useState(false);

  if (!broken) {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent clicks
          setBroken(true);
        }}
        className="bg-red-400 cursor-pointer"
        style={{
          width: size,
          height: size,
          border: "1px solid white",
          boxSizing: "border-box",
        }}
      />
    );
  }

  // broken: render 4 smaller squares (size / 2 each)
  const newSize = size / 2;

  return (
    <div
      className="grid grid-cols-2 grid-rows-2 gap-0"
      style={{
        width: size,
        height: size,
      }}
    >
      {[...Array(4)].map((_, i) => (
        <Rectangle key={i} size={newSize} />
      ))}
    </div>
  );
}

const Crosshair = () => {
  const [pos, setPos] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const handleMouseMove = (e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  };

  const handleClick = (e: MouseEvent) => {
    console.log("Clicked at:", { x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      {/* Vertical line */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: pos.x,
          width: "1px",
          height: "100vh",
          backgroundColor: "black",
          pointerEvents: "none",
          transform: "translateX(-50%)",
          zIndex: 9999,
        }}
      />

      {/* Horizontal line */}
      <div
        style={{
          position: "fixed",
          top: pos.y,
          left: 0,
          width: "100vw",
          height: "1px",
          backgroundColor: "black",
          pointerEvents: "none",
          transform: "translateY(-50%)",
          zIndex: 9999,
        }}
      />
    </>
  );
};

function App() {
  return (
    <>
      <Crosshair />
      <Rectangle size={40} />
    </>
  );
}

export default App;
