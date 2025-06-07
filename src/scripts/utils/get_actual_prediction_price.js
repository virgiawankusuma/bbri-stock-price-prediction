export default function getActualPredictionPrice(result) {
  const previous_Data = result.historicalData.Previous_Data || [];
  const predictedPreviousPrice = result.predictedPreviousPrice || [];

  let labels = []
  let actualPrices = [];
  for (let i = 0; i <= 5; i++) {
    const lagKey = `Lag_${i}`;
    const lagData = previous_Data[lagKey];
    if (lagData && lagData.Close && lagData.Close.date) {
      labels.push(lagData.Close.date);
      actualPrices.push(lagData.Close.value);
    }
  }

  let predictedPrices = [];
  for (let i = 0; i <= 5; i++) {
    const lagKey = `Lag_${i}`;
    const lagData = predictedPreviousPrice[lagKey];
    if (lagData && lagData.Close) {
      predictedPrices.push((Math.floor(lagData.Close.value * 100) / 100).toFixed(0));
    }
  }

  return {
    labels: labels,
    actualPrices: actualPrices,
    predictedPrices: predictedPrices,
  };
}