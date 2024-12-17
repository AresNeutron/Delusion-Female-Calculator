import "../App.css";
import { useFormContext } from "./Context";

export default function Result() {
  const { result, setResult, setAgeMax, setRace, setAgeMin, setExpectedSalary, setMinHeight} = useFormContext();

  const getDelusionLevel = (percent: number) => {
    if (percent <= 0.01) return "We're screwed 😫😭😂";
    if (percent < 0.5) return "You must be very desappointed 😖";
    if (percent < 2)
      return "Ow ow, seem that you're gonna have it tough to find your prince 🙁";
    if (percent < 5)
      return "Oh man, I mean, woman, relax, the chances are low but not zero.";
    if (percent < 10)
      return "Well, there is a lot of men in USA, this a good result actually 🙂";
    return "Probably you're not really a girl 🤭";
  };

  return (
    <div className=" rounded-lg p-4 space-y-6 w-3/5 mx-auto mt-10 text-white">
      <div className="result">
        <h2 className="text-xl font-semibold">
          Percent of men matched: 
        </h2>
        <p className="text-2xl font-bold mt-2">{result}%</p>
      </div>
      <div className="result">
        <h2 className="text-xl font-medium">And about your delusion...</h2>
        <p className="text-xl text-slate-300 mt-2 mb-4">
          {getDelusionLevel(result)}
        </p>
      </div>
      <button className="myButton" onClick={()=>{
        setResult(0)
        setAgeMax('')
        setAgeMin('')
        setMinHeight('')
        setExpectedSalary('')
        setRace('')
      }}>Try Again</button>
    </div>
  );
}
