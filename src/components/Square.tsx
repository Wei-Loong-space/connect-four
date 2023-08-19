interface SquareProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  // List your props here
}

const Square: React.FC<SquareProps> = props => {
  return (
    <div
      className="w-full h-full border-red bg-blue-600 flex justify-center items-center"
      {...props}
    >
      <div className="rounded-full bg-white w-16 h-16"></div>
    </div>
  );
};

export default Square;
