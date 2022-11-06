let xPoints = [-2, 1, 2, 4, 5, 6];
let yPoints = [7, 3, 5, 1, -2, 10];

function multiply(a1: number[], a2: number[]) {
    let result: number[] = [];
    a1.forEach(function (a, i) {
        a2.forEach(function (b, j) {
            result[i + j] = (result[i + j] || 0) + a * b;
        });
    });
    return result;
}

export const getCoefficients = (xPoints: number[], yPoints: number[]) => {
    let result = [];
    for (let i = 0; i < xPoints.length; i++) {
        result.push(0);
    }
    for (let i = 0; i < xPoints.length; i++) {
        let data = [];
        if (yPoints[i] == 0) continue;
        for (let j = 0; j < xPoints.length; j++) {
            if (j == i) continue;
            data.push([1, -xPoints[j]]);
        }
        let numerator = data.reduce(multiply);
        for (let j = 0; j < numerator.length; j++) {
            numerator[j] = numerator[j] * yPoints[i]
        }
        let denumerator = 1;
        for (let j = 0; j < xPoints.length; j++) {
            if (j == i) continue
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

// let testArrayX = []
// let testArrayY = []

// for (let i = 0; i < 5; i++) {
//     testArrayX[i] = (Math.random() * 25).toFixed(4)
//     testArrayY[i] = (Math.random() * 25).toFixed(4)
// }
// console.log(testArrayX, "\n-----\n", testArrayY, "\n%%%%%%%%%\n")
// console.log(getCoefficients(testArrayX, testArrayY))
//console.log(getCoefficients2(xPoints, yPoints))
//console.log(getCoefficients(xPoints, yPoints))