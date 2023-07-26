type Props = {
  value: string;
  btnColor: "orange" | "red" | "blue" | "white";
  handleButton: () => void;
};

const SquareButton = (props: Props) => {
  const { value, btnColor, handleButton } = props;
  const cssClass = (() => {
    switch (btnColor) {
      case "orange":
        return "text-white bg-game-orange";
      case "red":
        return "text-white bg-game-red";

      case "blue":
        return "text-white bg-game-blue";

      case "white":
        return "text-game-gray bg-white";
    }
  })();
  return (
    <div
      className={`w-28 h-14 flex justify-center items-center text-2xl rounded-lg ${cssClass}`}
      onClick={handleButton}
    >
      {value}
    </div>
  );
};

export default SquareButton;
