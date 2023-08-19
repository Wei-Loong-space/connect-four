import Board from "./components/Board";

function App() {
  return (
    <>
      <div className="container-xl bg-bg-image h-screen bg-cover">
        <h1 className="text-center text-[64px] font-bold py-2 text-white">
          Connect Four
        </h1>
        <Board />
      </div>
    </>
  );
}

export default App;
