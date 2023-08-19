import { cn } from "../utils/twMerge";

interface SquareProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  isPlaceholder?: boolean;
  showPlaceholder?: boolean;
  fill?: "player" | "none" | "computer";
  isTransitioning?: boolean;
}

const Square: React.FC<SquareProps> = ({
  isPlaceholder,
  showPlaceholder,
  isTransitioning,
  fill,
  ...props
}) => {
  return (
    <div
      className={cn(
        "w-full h-full border-red bg-blue-600 flex justify-center items-center cursor-pointer",
        isPlaceholder && "bg-blue-700",
        isTransitioning && "cursor-wait",
      )}
      {...props}
    >
      <div
        className={cn(
          "w-0 h-0 border-l-[30px] border-l-transparent border-t-[25px] border-t-red-500 border-r-[30px] border-r-transparent hidden self-end",
          showPlaceholder && "block",
        )}
      ></div>
      <div
        className={cn(
          "rounded-full bg-white w-16 h-16 flex justify-center items-center ",
          isPlaceholder && "hidden",
          fill === "player" && "bg-red-800",
          fill === "computer" && "bg-green-800",
        )}
      ></div>
    </div>
  );
};

export default Square;
