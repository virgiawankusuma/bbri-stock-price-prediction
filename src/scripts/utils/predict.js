import * as tf from '@tensorflow/tfjs';
import { historicalBBRIStockData } from './get_historical_data';

export function validateForm(formData) {
  // Validasi data kosong
  for (const field in formData) {
    if (!formData[field]) {
      alert(`Field ${field} tidak boleh kosong`);
      return;
    }
  }

  // Validasi numerik
  const numericFields = ['open', 'high', 'low', 'volume'];
  for (const field of numericFields) {
    if (isNaN(formData[field])) {
      alert(`Field ${field} harus berupa angka`);
      return;
    }
  }

  // Validasi tanggal
  const dateField = formData.tanggal;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateField)) {
    alert('Format tanggal tidak valid. Gunakan format YYYY-MM-DD.');
    return;
  }

  // Validasi tanggal tidak lebih dari hari ini
  const today = new Date();
  const inputDate = new Date(dateField);
  if (inputDate > today) {
    alert('Tanggal tidak boleh lebih dari hari ini.');
    return;
  }

  // Validasi tanggal tidak lebih dari 30 hari yang lalu
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);
  if (inputDate < thirtyDaysAgo) {
    alert('Tanggal tidak boleh lebih dari 30 hari yang lalu.');
    return;
  }

  // Validasi harga tidak boleh negatif
  const negativeFields = ['open', 'high', 'low', 'volume'];
  for (const field of negativeFields) {
    if (parseFloat(formData[field]) < 0) {
      alert(`Field ${field} tidak boleh negatif`);
      return;
    }
  }

  // Validasi volume tidak boleh nol
  if (parseFloat(formData.volume) <= 0) {
    alert('Field volume tidak boleh nol atau negatif');
    return;
  }

  return true;
}

export function predict(formData) {
  async function fetchBBRIData() {
    const jsonData = JSON.parse(localStorage.getItem('fetchData'));
    
    const processed = historicalBBRIStockData(jsonData);
    const processedData = processed.data;

    // Baris terakhir
    const lastRow = processedData[processedData.length - 1];

    // Ambil tanggal-tanggal penting
    const date_Close_Lag_1 = processedData[processedData.length - 2]?.Date ?? null;
    const date_Close_Lag_2 = processedData[processedData.length - 3]?.Date ?? null;
    const date_Close_Lag_3 = processedData[processedData.length - 4]?.Date ?? null;
    const date_Current = lastRow.Date;
    const date_Daily_Return = `${processedData[processedData.length - 2]?.Date} ➝ ${lastRow.Date}`;
    const date_MA7 = `${processedData[processedData.length - 7]?.Date} ➝ ${lastRow.Date}`;
    const date_MA30 = `${processedData[processedData.length - 30]?.Date} ➝ ${lastRow.Date}`;

    // Bentuk historical data dengan tanggal
    const historicalData = {
      Dataset_Range: { value: processed.dateRange },
      Date: { value: lastRow.Date, date: date_Current },
      Open: { value: lastRow.Open, date: date_Current },
      High: { value: lastRow.High, date: date_Current },
      Low: { value: lastRow.Low, date: date_Current },
      Close: { value: lastRow.Close, date: date_Current },
      Volume: { value: lastRow.Volume, date: date_Current },
      Adjusted_Close: { value: lastRow.AdjustedClose, date: date_Current },
      Close_Lag_1: { value: lastRow.Close_Lag_1, date: date_Close_Lag_1 },
      Close_Lag_2: { value: lastRow.Close_Lag_2, date: date_Close_Lag_2 },
      Close_Lag_3: { value: lastRow.Close_Lag_3, date: date_Close_Lag_3 },
      Daily_Return: { value: lastRow.Daily_Return, date: date_Daily_Return },
      MA_7: { value: lastRow.MA_7, date: date_MA7 },
      MA_30: { value: lastRow.MA_30, date: date_MA30 }
    };

    // console.log("Historical Data:", historicalData);
    return historicalData;
  }

  async function loadModel() {
    const model = await tf.loadGraphModel(
      '/model/tfjs_model_json/model.json',
    );
    // console.log('Model loaded:', model);
    return model;
  }

  async function predictPrice(model, inputData) {
    const inputTensor = tf.tensor2d([inputData], [1, 5]);
    const prediction = model.predict(inputTensor);
    const predictedPrice = prediction.dataSync()[0];
    return predictedPrice;
  }

  async function runPrediction() {
    const model = await loadModel();

    const inputData = [
      formData.open,
      formData.high,
      formData.low,
      formData.volume,
      formData.adjusted_close,
    ];

    const predictedPrice = await predictPrice(model, inputData);
    const historicalData = await fetchBBRIData();

    const predictedPriceValue = predictedPrice * 0.9; // Mengalikan dengan 0.9 untuk mendapatkan harga prediksi yang lebih realistis
    // return predictedPrice;
    return {
      predictedPrice: {
        value: predictedPriceValue,
        direction: predictedPriceValue > formData.adjusted_close ? 'up' : 'down',
        change: parseFloat(Math.abs(predictedPriceValue - formData.adjusted_close).toFixed(2)),
        percentageChange: parseFloat((((predictedPriceValue - formData.adjusted_close) / formData.adjusted_close) * 100).toFixed(2)),
      },
      historicalData: historicalData
    };
  }

  return runPrediction()
}
