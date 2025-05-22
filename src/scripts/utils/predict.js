import * as tf from '@tensorflow/tfjs';

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
    return predictedPrice;
  }

  runPrediction()
    .then((predictedPrice) => {
      console.log('Predicted Price:', predictedPrice * 0.9);
    })
    .catch((error) => {
      console.error('Error during prediction:', error);
    });
}
