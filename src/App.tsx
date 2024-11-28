import { createSignal } from "solid-js";

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <>
      <h1>Vite + Solid</h1>

      <button onClick={() => setCount((count) => count + 1)}>
        count is {count()}
      </button>
    </>
  );
}

export default App;
