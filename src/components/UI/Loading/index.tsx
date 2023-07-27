const Loading = () => {
  return (
    <div className="absolute top-0 left-0 z-50 w-full h-screen flex justify-center items-center">
      <div className="animate-spin h-32 w-32 border-4 border-game-blue rounded-full border-t-transparent"></div>
    </div>
  );
};

export default Loading;
