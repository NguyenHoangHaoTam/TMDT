import { Leaf, Sun, TreePine } from "lucide-react";

const BackgroundAnimated = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-20 left-[10%] text-green-primary opacity-20 animate-float"
        style={{ animationDelay: "0s" }}
      >
        <Leaf size={60} />
      </div>
      <div
        className="absolute top-40 right-[15%] text-green-primary opacity-15 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <Leaf size={80} />
      </div>
      <div
        className="absolute bottom-32 left-[20%] text-green-primary opacity-25 animate-float"
        style={{ animationDelay: "4s" }}
      >
        <Leaf size={50} />
      </div>
      <div
        className="absolute top-60 right-[25%] text-green-primary opacity-20 animate-bounce-slow"
        style={{ animationDelay: "1s" }}
      >
        <Leaf size={45} />
      </div>

      <div className="absolute bottom-0 left-[5%] text-green-primary opacity-30 animate-sway">
        <TreePine size={120} />
      </div>
      <div
        className="absolute bottom-0 right-[8%] text-green-primary opacity-25 animate-sway"
        style={{ animationDelay: "1s" }}
      >
        <TreePine size={100} />
      </div>

      <div className="absolute top-10 right-[10%] text-yellow-400 opacity-80 animate-shimmer">
        <Sun size={80} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#74A031]/20 to-transparent" />
    </div>
  );
};

export default BackgroundAnimated;
