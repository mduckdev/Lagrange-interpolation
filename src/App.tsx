import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Cards } from "./components/Cards.component"
import { RootState } from './redux/store';
import "./scss/style.scss"
function App() {
  const cardsList = useSelector((state: RootState) => state.cards);
  const [url, setUrl] = useState("");
  function multiply(a1: number[], a2: number[]) {
    let result: number[] = [];
    a1.forEach(function (a, i) {
      a2.forEach(function (b, j) {
        result[i + j] = (result[i + j] || 0) + a * b;
      });
    });
    return result;
  }

  const getCoefficients = (xPoints: number[], yPoints: number[]): number[] => {
    if (yPoints.length <= 1) { return [yPoints[0]] }
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
      let denumerator: number = 1;
      for (let j = 0; j < xPoints.length; j++) {
        if (j === i) continue
        denumerator = denumerator * (xPoints[i] - xPoints[j])
      }
      for (let j = 0; j < xPoints.length; j++) {
        numerator[j] = numerator[j] / denumerator;
      }
      for (let j = 0; j < xPoints.length; j++) {
        result[j] += numerator[j];
      }
    }
    return result;
  }
  const showEquation = () => {
    console.log(cardsList)
    const xPoints: number[] = cardsList.map(element => Number(element.xValue));
    const yPoints: number[] = cardsList.map(element => Number(element.yValue));
    console.log(xPoints, yPoints)
    const Coefficients = getCoefficients(xPoints, yPoints);
    if ((new Set(xPoints)).size !== yPoints.length) { return }

    let equation: string = "f(x)=";
    for (let i = 0; i < Coefficients.length; i++) {
      let sign: string = "+"
      if (i === 0) sign = ""
      if (Coefficients[i] === 0 && i !== 0) continue
      if (Coefficients[i] < 0) sign = "-"
      if (Coefficients.length - 1 - i === 1) {
        equation += sign + Math.abs(Coefficients[i]).toString() + "x";
        continue;
      }
      if (Coefficients.length - 1 - i === 0) {
        equation += sign + Math.abs(Coefficients[i]).toString();
        continue;
      }
      equation += sign + Math.abs(Coefficients[i]).toString() + "x^" + String(Coefficients.length - 1 - i);
    }
    setUrl("https://latex.codecogs.com/png.image?\\dpi{110}" + equation);
  }
  return (
    <div className="App">
      <div className='card-container'>
        <Cards></Cards>
        <button onClick={showEquation} className='submitButton'>OBLICZ</button>

      </div>

      {url.length > 0 ? (<div className='results'><br></br><img alt="Equation" src={url}></img></div>) : (<div></div>)}
    </div>
  );
}

export default App;
