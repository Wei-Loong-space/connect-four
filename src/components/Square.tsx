interface SquareProps {
  // List your props here
}

const Square: React.FC<SquareProps> = props => {
  return <div className="w-full h-full border border-red bg-blue-600"></div>;
};

export default Square;
