import "./App.css";
import { useFormContext } from "./components/Context";
import DelusionCalculatorForm from "./components/DelusionCalculatorForm";
import Info from "./components/Info";
import Result from "./components/Result";
import "./index.css";

function App() {
  const {result} = useFormContext()

  return (
    <div className="min-h-screen m-auto bg-slate-900 flex
     items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[60%] bg-slate-800 shadow-md rounded-lg p-6">
        <Info/>
        {result === 0 && <DelusionCalculatorForm/>}
        {result !==0 && <Result/>}
      </div>
    </div>
  );
}

export default App;
