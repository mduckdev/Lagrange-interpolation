export const utils = () => {
    const xPoints: number[] = [-3, 1, 2, 3];
    const yPoints: number[] = [0, 4, 0, 1];

    function getCoefficients(yPoints: number[], xPoints: number[]) {
        let coefficients: number[] = [];
        for (let i = 0; i < xPoints.length; i++) coefficients[i] = 0; //uzupełnianie tablicy zerami

        for (let i = 0; i < xPoints.length; i++) {
            let newCoefficients = [];
            for (let nc = 0; nc < xPoints.length; nc++) newCoefficients[nc] = 0; //uzupełnianie pomocniczej tablicy zerami
            if (i > 0) { // kolejne iteracje
                newCoefficients[0] = -xPoints[0] / (xPoints[i] - xPoints[0]);
                newCoefficients[1] = 1 / (xPoints[i] - xPoints[0]);
            } else { // pierwsza iteracja
                newCoefficients[0] = -xPoints[1] / (xPoints[i] - xPoints[1]);
                newCoefficients[1] = 1 / (xPoints[i] - xPoints[1]);
            }
            let startIndex: number = 1;
            if (i == 0) startIndex = 2;
            for (let n = startIndex; n < xPoints.length; n++) {
                if (i == n) continue;
                for (let nc = xPoints.length - 1; nc >= 1; nc--) {
                    newCoefficients[nc] = newCoefficients[nc] * (-xPoints[n] / (xPoints[i] - xPoints[n])) + newCoefficients[nc - 1] / (xPoints[i] - xPoints[n]);
                }
                newCoefficients[0] = newCoefficients[0] * (-xPoints[n] / (xPoints[i] - xPoints[n]));
            }
            for (let nc = 0; nc < xPoints.length; nc++) coefficients[nc] += yPoints[i] * newCoefficients[nc];
        }
        return coefficients;
    }

    let cf: number[] = getCoefficients(yPoints, xPoints);
    console.log(cf);
}

