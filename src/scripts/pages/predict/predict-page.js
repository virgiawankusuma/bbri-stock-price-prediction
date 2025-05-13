import PredictForm from './predict-form.js';

export default class PredictPage {
  constructor() {
    this.predictForm = new PredictForm();
  }

  async render() {
    return `
      <section class="container mt-4 mb-5">
        <div class="header-section">
          <h1>Masukkan Data Saham untuk Analisis Prediksi</h1>
          <p>Gunakan data terbaru untuk memperoleh wawasan tentang<br>pergerakan harga saham</p>
        </div>
      </section>
      <div id="predict-form-container"></div>
    `;
  }

  async afterRender() {
    document.title = 'Prediksi Harga - BBRI Stock Price Prediction';

    this.predictForm.mount('predict-form-container');
  }
}
