const BackgroundBottomImg = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 Q50,20 100,50 T200,50 T300,50 T400,50 T500,50 T600,50 T700,50 T800,50 T900,50 T1000,50 T1100,50 T1200,50 L1200,100 L0,100 Z"
          fill="#74A031"
          opacity="0.3"
        />
        <path
          d="M0,70 Q50,50 100,70 T200,70 T300,70 T400,70 T500,70 T600,70 T700,70 T800,70 T900,70 T1000,70 T1100,70 T1200,70 L1200,100 L0,100 Z"
          fill="#74A031"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default BackgroundBottomImg;
