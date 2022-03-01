import "./style.css";
import Counter from "./Counter";
import ColorProvider from "./ColorContext";
import ColorSelect from "./ColorSelect";

export default function App() {
  return (
    <div className="App">
      <ColorProvider>
        <Counter />
        <ColorSelect />
      </ColorProvider>
    </div>
  );
}
