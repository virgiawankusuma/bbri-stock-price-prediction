import PredictResult from './predict-result';
import { historicalBBRIStockData } from '../../utils/get_historical_data.js';
import { setupDatePicker } from '../../utils/index.js';
import { validateForm, predict } from '../../utils/predict.js';

export default class PredictForm {
  constructor() {
    this.predictResult = new PredictResult();

    this.validateForm = validateForm;
    this.predict = predict;
  }

  render() {
    const jsonData = JSON.parse(localStorage.getItem('fetchData'));
    const historicalData = historicalBBRIStockData(jsonData).data;
    const lastRow = historicalData[historicalData.length - 1];

    return `
      <section class="container my-5">
        <h2 class="section-title d-none">📊 Masukkan Data Saham</h2>
        <h3 class="section-subtitle">Data Saham Harian</h2>
        <p class="mb-0">Silakan masukkan informasi saham berikut:</p>
        <small class="text-muted mb-4">
          Anda dapat melihat data historis saham BBRI di <a href="https://www.ir-bri.com/stock_chart_interactive.html" target="_blank" rel="noopener noreferrer">IR:IC BRI</a> atau <a href="https://finance.yahoo.com/quote/BBRI.JK/history" target="_blank" rel="noopener noreferrer">Yahoo Finance</a>.<br>  
        </small>
        <form class="row g-3 mt-4" id="predict-form">
          <div class="col-md-6 mb-3">
            <label class="form-label">📅 Tanggal</label>
            <input id="datePicker" type="text" class="form-control" placeholder="Loading..." readonly>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">💰 Harga Pembukaan (Open)</label>
            <div class="input-group">
              <span class="input-group-text">Rp.</span>
              <input type="number" class="form-control" placeholder="4212" value="${lastRow.Open}">
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">📈 Harga Tertinggi (High)</label>
            <div class="input-group">
              <span class="input-group-text">Rp.</span>
              <input type="number" class="form-control" placeholder="4466" value="${lastRow.High}">
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">📉 Harga Terendah (Low)</label>
            <div class="input-group">
              <span class="input-group-text">Rp.</span>
              <input type="number" class="form-control" placeholder="4145" value="${lastRow.Low}">
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">📊 Volume Transaksi</label>
            <div class="input-group">
              <span class="input-group-text">Rp.</span>
              <input type="number" class="form-control" placeholder="180000" value="${lastRow.Volume}">
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">📏 Harga Penutupan (Adjusted Close)</label>
            <div class="input-group">
              <span class="input-group-text">Rp.</span>
              <input type="number" class="form-control" placeholder="4212" value="${lastRow.AdjustedClose}">
            </div> 
          </div>
        </form>

        <div class="alert alert-info d-flex align-items-center mt-3 mb-4">
          <small>🔍 Data ini akan digunakan untuk memprediksi pergerakan harga saham <strong><em>Algoritma Least Square.</em></strong></small>
        </div>

        <div class="d-flex gap-2 align-items-center">
          <button class="btn btn-primary px-4" id="predict-button" type="submit" form="predict-form">
            Kirim Data & Lihat Prediksi
          </button>
          <!--<span>/</span>
          <button class="btn btn-outline-primary d-flex align-items-center" id="upload-button" type="button">
            <i class="bi bi-upload me-2"></i> Upload File CSV
          </button>-->
        </div>
      </section>
      <div id="predict-result-container"></div>
    `;
  }

  init() {
    // Inisialisasi date picker and if setup still loading, disable date input and show loading message
    const datePicker = document.getElementById('datePicker')
    if (datePicker) {
      datePicker.readOnly = false;
      setupDatePicker();
    }

    document.title = 'Prediksi Harga - BBRI Stock Price Prediction';
    // Inisialisasi event listeners
    const predictForm = document.getElementById('predict-form');
    const inputFields = predictForm.querySelectorAll('input');
    const predictButton = document.getElementById('predict-button');
    const uploadButton = document.getElementById('upload-button');

    predictButton.addEventListener('click', async (event) => {
      event.preventDefault();

      // this.predictResult.mount('predict-result-container');

      const formData = {
        tanggal: inputFields[0].value,
        open: parseFloat(inputFields[1].value),
        high: parseFloat(inputFields[2].value),
        low: parseFloat(inputFields[3].value),
        volume: parseFloat(inputFields[4].value),
        adjusted_close: parseFloat(inputFields[5].value),
      };

      this.validateForm(formData);

      if (this.validateForm(formData)) {
        try {
          const result = await this.predict(formData);
          // console.log('Predicted Result:', result);

          // Misal kamu mau render hasilnya:
          this.predictResult.mount('predict-result-container', result);
        } catch (error) {
          console.error('Gagal melakukan prediksi:', error);
        }
      }

      // Reset form setelah pengiriman
      // inputFields.forEach((input) => {
      //   input.value = '';
      // });
      // predictForm.reset();
    });

    uploadButton.addEventListener('click', () => {
      console.log('Upload button clicked');
      // Implementasi logika untuk mengupload file CSV
    });
  }

  // Method untuk merender komponen ke container
  mount(container) {
    if (typeof container === 'string') {
      container = document.getElementById(container);
    }

    if (!container) {
      console.error('Container not found');
      return;
    }

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

  update() {
    if (this.element) {
      this.element.innerHTML = this.render();
      this.init();
    }
  }

  destroy() {
    this.unmount();
  }
}
