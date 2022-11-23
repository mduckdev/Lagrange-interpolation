import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Cards } from "./components/Cards.component"
import { RootState } from './redux/store';
import "./css/style.css"
function App() {

  const cardsList = useSelector((state: RootState) => state.cards);
  const [url, setUrl] = useState("");
  const [interpolatedXValue, setInterpolatedXValue] = useState<string | null>("");
  const [equation, setEquation] = useState("");
  const [isValidX, setIsValidX] = useState(true);


  const handleInput = (element: React.FormEvent<HTMLInputElement>) => {
    let value: string = element.currentTarget.value;
    if (value === "") {
      setIsValidX(true)
      setInterpolatedXValue(value)
      return;
    }
    if (isNaN(Number(value))) {
      setIsValidX(false)
    } else {
      setIsValidX(true)
    }
    setInterpolatedXValue(value)
  }

  const multiply = (a1: number[], a2: number[]) => {
    let result: number[] = [];
    a1.forEach((a, i) => {
      a2.forEach((b, j) => {
        result[i + j] = (result[i + j] || 0) + a * b;
      });
    });
    return result;
  }


  const showPlot = () => {
    const xPoints: number[] = cardsList.map(element => Number(element.xValue));
    const yPoints: number[] = cardsList.map(element => Number(element.yValue));
    if (document.querySelector(".error")) { return }
    if (xPoints.length < 1 || yPoints.length < 1) { return }
    if ((new Set(xPoints)).size !== yPoints.length) { return }
    fetch("http://localhost:5000/ping").then(e => {
      fetch("http://localhost:5000/showPlot", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ xPoints: xPoints, yPoints: yPoints }) })
    }).catch(err => {
      window.open("https://www.wolframalpha.com/input?i=plot+" + equation.slice(5).replaceAll("+", "%2b").replaceAll("{", "").replaceAll("}", ""));
    })
  }

  const getCoefficients = (xPoints: number[], yPoints: number[]): number[] => {
    if ((new Set(yPoints)).size === 1) { return [yPoints[0]] }
    let result: number[] = [];
    for (let i = 0; i < xPoints.length; i++) {
      result.push(0);
    }
    for (let i = 0; i < xPoints.length; i++) {
      let data: number[][] = [];
      if (yPoints[i] === 0) continue;
      for (let j = 0; j < xPoints.length; j++) {
        if (j === i) continue;
        data.push([1, -xPoints[j]]);
      }
      let numerator: number[] = data.reduce(multiply);
      for (let j = 0; j < numerator.length; j++) {
        numerator[j] = numerator[j] * yPoints[i]
      }
      let denominator: number = 1;
      for (let j = 0; j < xPoints.length; j++) {
        if (j === i) continue
        denominator = denominator * (xPoints[i] - xPoints[j])
      }
      for (let j = 0; j < xPoints.length; j++) {
        numerator[j] = numerator[j] / denominator;
      }
      for (let j = 0; j < xPoints.length; j++) {
        result[j] += numerator[j];
      }
    }
    return result;
  }
  const showEquation = () => {
    const xPoints: number[] = cardsList.map(element => Number(element.xValue));
    const yPoints: number[] = cardsList.map(element => Number(element.yValue));
    if (document.querySelector(".error")) { return alert("Niepoprawne dane wejściowe") }
    if (xPoints.length < 1 || yPoints.length < 1) { return }
    if ((new Set(xPoints)).size !== xPoints.length) { return alert("Wszystkie punkty muszą być unikalne") }
    const Coefficients = getCoefficients(xPoints, yPoints);
    let equation: string = "f(x)=";
    for (let i = 0; i < Coefficients.length; i++) {
      let sign: string = "+"
      let currentCoefficient = (Coefficients[i].toString().length > 12 ? parseFloat(Coefficients[i].toFixed(10)) : (Coefficients[i]));
      if (i === 0) sign = ""
      if (currentCoefficient === 0 && i !== 0) continue
      if (currentCoefficient < 0) sign = "-";
      if (Coefficients.length - 1 - i === 1) {
        equation += sign + Math.abs(currentCoefficient).toString() + "x";
        continue;
      }
      if (Coefficients.length - 1 - i === 0) {
        equation += sign + Math.abs(currentCoefficient).toString();
        continue;
      }
      equation += sign + Math.abs(currentCoefficient).toString() + "x^{" + String(Coefficients.length - 1 - i) + "}";
    }
    navigator.clipboard.writeText(equation.slice(5));
    setEquation(equation);
    if (interpolatedXValue && interpolatedXValue.length > 0) {
      setUrl("https://latex.codecogs.com/png.image?\\dpi{200}\\\\" + equation + `\\\\f(${interpolatedXValue})=${calculateY(yPoints, xPoints, Number(interpolatedXValue))}`);
    } else {
      setUrl("https://latex.codecogs.com/png.image?\\dpi{200}\\\\" + equation)
    }

  }
  const calculateY = (yPoints: number[], xPoints: number[], interpolatedXValue: number) => {
    if (yPoints.length === 1) { return [yPoints[0]] }
    if (xPoints.length !== yPoints.length || xPoints.length === 0) return;
    if (yPoints.length === 1) return (yPoints[0] / xPoints[0]) * interpolatedXValue;
    let result = 0;
    for (let i = 0; i < yPoints.length; i++) {
      let tempValue = 1;
      for (let j = 0; j < yPoints.length; j++) {
        if (i !== j) {
          tempValue *= (interpolatedXValue - xPoints[j]) / (xPoints[i] - xPoints[j]);
        }
      }
      result += tempValue * yPoints[i];
    }
    return result;
  }
  return (
    <div className="App">
      <div className='card-container'>
        <Cards></Cards>
        <button onClick={showEquation} className='submitButton'>OBLICZ</button>
        <input onChange={e => handleInput(e)} type="text" className={isValidX ? ("calculateYInput") : ("calculateYInput error")} placeholder='Oblicz wartość dla x:'></input>
      </div>

      {url.length > 0 ? (<div className='results'><br></br><img alt={equation} src={url}></img></div>) : (<div></div>)}
      <br></br>
      <div className='graph'>
        <a onClick={showPlot} href="#">WYKRES</a>
        <br></br>
        <i>Wzór po wygenerowaniu zostaje skopiowany do schowka</i>
      </div>
    </div>
  );
}

export default App;
