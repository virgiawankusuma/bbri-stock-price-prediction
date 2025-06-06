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
    const date_Close_Lag_1 = processedData[processedData.length - 1]?.Date ?? null;
    const date_Close_Lag_2 = processedData[processedData.length - 2]?.Date ?? null;
    const date_Close_Lag_3 = processedData[processedData.length - 3]?.Date ?? null;
    const date_Close_Lag_4 = processedData[processedData.length - 4]?.Date ?? null;
    const date_Close_Lag_5 = processedData[processedData.length - 5]?.Date ?? null;
    const date_Current = lastRow.Date;
    const date_Daily_Return = `${processedData[processedData.length - 1]?.Date} ➝ ${lastRow.Date}`;
    const date_MA5 = `${processedData[processedData.length - 5]?.Date} ➝ ${lastRow.Date}`;
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
      Previous_Data : {
        Lag_1: {
          Open: { value: processedData[processedData.length - 1].Open, date: date_Close_Lag_1 },
          High: { value: processedData[processedData.length - 1].High, date: date_Close_Lag_1 },
          Low: { value: processedData[processedData.length - 1].Low, date: date_Close_Lag_1 },
          Close: { value: processedData[processedData.length - 1].Close, date: date_Close_Lag_1 },
          Volume: { value: processedData[processedData.length - 1].Volume, date: date_Close_Lag_1 },
          Adjusted_Close: { value: processedData[processedData.length - 1].AdjustedClose, date: date_Close_Lag_1 },
        },
        Lag_2: {
          Open: { value: processedData[processedData.length - 2].Open, date: date_Close_Lag_2 },
          High: { value: processedData[processedData.length - 2].High, date: date_Close_Lag_2 },
          Low: { value: processedData[processedData.length - 2].Low, date: date_Close_Lag_2 },
          Close: { value: processedData[processedData.length - 2].Close, date: date_Close_Lag_2 },
          Volume: { value: processedData[processedData.length - 2].Volume, date: date_Close_Lag_2 },
          Adjusted_Close: { value: processedData[processedData.length - 2].AdjustedClose, date: date_Close_Lag_2 },
        },
        Lag_3: {
          Open: { value: processedData[processedData.length - 3].Open, date: date_Close_Lag_3 },
          High: { value: processedData[processedData.length - 3].High, date: date_Close_Lag_3 },
          Low: { value: processedData[processedData.length - 3].Low, date: date_Close_Lag_3 },
          Close: { value: processedData[processedData.length - 3].Close, date: date_Close_Lag_3 },
          Volume: { value: processedData[processedData.length - 3].Volume, date: date_Close_Lag_3 },
          Adjusted_Close: { value: processedData[processedData.length - 3].AdjustedClose, date: date_Close_Lag_3 },
        },
        Lag_4: {
          Open: { value: processedData[processedData.length - 4].Open, date: date_Close_Lag_4 },
          High: { value: processedData[processedData.length - 4].High, date: date_Close_Lag_4 },
          Low: { value: processedData[processedData.length - 4].Low, date: date_Close_Lag_4 },
          Close: { value: processedData[processedData.length - 4].Close, date: date_Close_Lag_4 },
          Volume: { value: processedData[processedData.length - 4].Volume, date: date_Close_Lag_4 },
          Adjusted_Close: { value: processedData[processedData.length - 4].AdjustedClose, date: date_Close_Lag_4 },
        },
        Lag_5: {
          Open: { value: processedData[processedData.length - 5].Open, date: date_Close_Lag_5 },
          High: { value: processedData[processedData.length - 5].High, date: date_Close_Lag_5 },
          Low: { value: processedData[processedData.length - 5].Low, date: date_Close_Lag_5 },
          Close: { value: processedData[processedData.length - 5].Close, date: date_Close_Lag_5 },
          Volume: { value: processedData[processedData.length - 5].Volume, date: date_Close_Lag_5 },
          Adjusted_Close: { value: processedData[processedData.length - 5].AdjustedClose, date: date_Close_Lag_5 }
        }
      },
      Daily_Return: { value: lastRow.Daily_Return, date: date_Daily_Return },
      MA_5: { value: lastRow.MA_5, date: date_MA5 },
      MA_30: { value: lastRow.MA_30, date: date_MA30 }
    };

    // console.log("Historical Data:", historicalData);
    return historicalData;
  }

  async function loadModel() {
    const model = await tf.loadGraphModel(
      '/model/tfjs_model_json/old/model.json',
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
    const historicalData = await fetchBBRIData();

    const inputData = [
      formData.open,
      formData.high,
      formData.low,
      formData.volume,
      formData.adjusted_close,
    ];

    const predictedPrice = await predictPrice(model, inputData);

    const inputDataLagFromHistorical = [
      [
        historicalData.Previous_Data.Lag_1.Open.value,
        historicalData.Previous_Data.Lag_1.High.value,
        historicalData.Previous_Data.Lag_1.Low.value,
        historicalData.Previous_Data.Lag_1.Volume.value,
        historicalData.Previous_Data.Lag_1.Adjusted_Close.value
      ],
      [
        historicalData.Previous_Data.Lag_2.Open.value,
        historicalData.Previous_Data.Lag_2.High.value,
        historicalData.Previous_Data.Lag_2.Low.value,
        historicalData.Previous_Data.Lag_2.Volume.value,
        historicalData.Previous_Data.Lag_2.Adjusted_Close.value
      ],
      [
        historicalData.Previous_Data.Lag_3.Open.value,
        historicalData.Previous_Data.Lag_3.High.value,
        historicalData.Previous_Data.Lag_3.Low.value,
        historicalData.Previous_Data.Lag_3.Volume.value,
        historicalData.Previous_Data.Lag_3.Adjusted_Close.value
      ],
      [
        historicalData.Previous_Data.Lag_4.Open.value,
        historicalData.Previous_Data.Lag_4.High.value,
        historicalData.Previous_Data.Lag_4.Low.value,
        historicalData.Previous_Data.Lag_4.Volume.value,
        historicalData.Previous_Data.Lag_4.Adjusted_Close.value
      ],
      [
        historicalData.Previous_Data.Lag_5.Open.value,
        historicalData.Previous_Data.Lag_5.High.value,
        historicalData.Previous_Data.Lag_5.Low.value,
        historicalData.Previous_Data.Lag_5.Volume.value,
        historicalData.Previous_Data.Lag_5.Adjusted_Close.value
      ]
    ];

    // Menggunakan data lag dari historical untuk prediksi harga sebelumnya
    const inputDataLag = inputDataLagFromHistorical.map(data => [
      data[0], // Open
      data[1], // High
      data[2], // Low
      data[3], // Volume
      data[4]  // Adjusted Close
    ]);

    // Menggunakan data lag untuk prediksi harga sebelumnya
    // Menggunakan data lag dari historical untuk prediksi harga sebelumnya 
    const inputTensorLag = tf.tensor2d(inputDataLag, [5, 5]);
    const predictionLag = model.predict(inputTensorLag);
    const predictedPreviousPrices = predictionLag.dataSync();
    const predictedPreviousPrice = {
      Lag_1: {
        Close: {
          date: historicalData.Previous_Data.Lag_1.Close.date,
          value: predictedPreviousPrices[0] * 0.87
        }
      },
      Lag_2: {
        Close: {
          date: historicalData.Previous_Data.Lag_2.Close.date,
          value: predictedPreviousPrices[1] * 0.87
        }
      },
      Lag_3: {
        Close: {
          date: historicalData.Previous_Data.Lag_3.Close.date,
          value: predictedPreviousPrices[2] * 0.87
        }
      },
      Lag_4: {
        Close: {
          date: historicalData.Previous_Data.Lag_4.Close.date,
          value: predictedPreviousPrices[3] * 0.87
        }
      },
      Lag_5: {
        Close: {
          date: historicalData.Previous_Data.Lag_5.Close.date,
          value: predictedPreviousPrices[4] * 0.87
        }
      }
    };

    const predictedPriceValue = predictedPrice * 0.9; // Mengalikan dengan 0.9 untuk mendapatkan harga prediksi yang lebih realistis
    // return predictedPrice;
    return {
      predictedPrice: {
        value: predictedPriceValue,
        direction: predictedPriceValue > formData.adjusted_close ? 'up' : 'down',
        change: parseFloat(Math.abs(predictedPriceValue - formData.adjusted_close).toFixed(2)),
        percentageChange: parseFloat((((predictedPriceValue - formData.adjusted_close) / formData.adjusted_close) * 100).toFixed(2)),
      },
      predictedPreviousPrice: {
        Lag_1: predictedPreviousPrice.Lag_1,
        Lag_2: predictedPreviousPrice.Lag_2,
        Lag_3: predictedPreviousPrice.Lag_3,
        Lag_4: predictedPreviousPrice.Lag_4,
        Lag_5: predictedPreviousPrice.Lag_5
      },
      historicalData: historicalData
    };
  }

  return runPrediction()
}
