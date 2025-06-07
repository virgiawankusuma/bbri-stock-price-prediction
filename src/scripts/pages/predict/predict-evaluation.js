export default class PredictEvaluation {
  constructor() {
    this.result = null; // untuk menyimpan data hasil prediksi
  }
  
  render() {
    const modelEvaluation = this.result?.evaluation || {};

    let textResult = '';
    if (modelEvaluation.mape < 10 && modelEvaluation.mse < 50) {
      textResult = 'Hasil Prediksi saham berhasil menunjukkan tingkat akurasi yang tinggi dengan nilai MAPE <10% dan MSE <50. Anda dapat mengandalkan hasil prediksi ini untuk membuat keputusan investasi yang lebih cerdas dan terinformasi.';
    } else if (modelEvaluation.mape < 10 && modelEvaluation.mse >= 50) {
      textResult = 'Hasil Prediksi saham menunjukkan tingkat akurasi yang baik dengan nilai MAPE <10%, namun MSE di atas 50. Anda masih dapat mempertimbangkan hasil ini, tetapi perlu berhati-hati dalam pengambilan keputusan investasi.';
    } else if (modelEvaluation.mape >= 10 && modelEvaluation.mse < 50) {
      textResult = 'Hasil Prediksi saham menunjukkan tingkat akurasi yang kurang baik dengan nilai MAPE >=10%, namun MSE di bawah 50. Anda perlu mempertimbangkan faktor lain sebelum mengambil keputusan investasi.';
    } else {
      textResult = 'Hasil Prediksi saham menunjukkan tingkat akurasi yang kurang baik dengan nilai MAPE >=10% dan MSE >=50. Anda harus berhati-hati dalam mengandalkan hasil prediksi ini untuk keputusan investasi.';
    }

    return `
      <h2 class="section-title mb-3 text-center">🔬Evaluasi Akurasi</h2>
      <h3 class="section-subtitle text-center">Mengukur Seberapa Dekat Prediksi dengan Kenyataan</h3>
      <div class="metric-box">
        <div class="row mb-2">
          <div class="col-md-8">Nilai MAPE (Mean Absolute Percentage Error):</div>
          <div class="col-md-4 text-primary fw-bold">${modelEvaluation.mape ? modelEvaluation.mape.toFixed(2) + '%' : 'N/A'}</div>
        </div>
        <div class="row mb-3">
          <div class="col-md-8">Nilai MSE (Mean Squared Error)</div>
          <div class="col-md-4 text-primary fw-bold">${modelEvaluation.mse ? modelEvaluation.mse.toFixed(2) : 'N/A'}</div>
        </div>
        <p class="text-muted mb-0 small">
          ${textResult}
        </p>
      </div>
    `;
  }

  init() {
  }

  mount(container, result) {
    if (typeof container === 'string') {
      container = document.getElementById(container);
    }
    
    if (!container) {
      console.error('Container not found');
      return;
    }
    this.result = result; // Simpan hasil prediksi ke dalam instance
    container.innerHTML = this.render();
    this.init();
    this.element = container;
  }

  unmount() {
    if (this.element) {
      this.element.innerHTML = '';
      this.element = null;
    }
  }
}