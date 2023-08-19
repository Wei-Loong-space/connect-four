import { cn } from "../utils/twMerge";

interface SquareProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  coordinate: string;
  isPlaceholder?: boolean;
  // List your props here
}

const Square: React.FC<SquareProps> = ({
  coordinate,
  isPlaceholder,
  ...props
}) => {
  return (
    <div
      className={cn(
        "w-full h-full border-red bg-blue-600 flex justify-center items-center",
        isPlaceholder && "bg-blue-700",
      )}
      {...props}
    >
      {!isPlaceholder && (
        <div className="rounded-full bg-white w-16 h-16 flex justify-center items-center">
          {coordinate}
        </div>
      )}
    </div>
  );
};

export default Square;
