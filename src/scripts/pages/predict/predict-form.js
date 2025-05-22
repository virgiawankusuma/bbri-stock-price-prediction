import PredictResult from "./predict-result";
import { validateForm, predict } from "../../utils/predict.js";

export default class PredictForm {
  constructor() {
    this.predictResult = new PredictResult();

    this.validateForm = validateForm;
    this.predict = predict;
  }

  render() {
    return `
      <section class="container my-5">
        <h2 class="section-title d-none">📊 Masukkan Data Saham</h2>
        <h3 class="section-subtitle">Data Saham Harian</h2>
        <p class="mb-4">Silakan masukkan informasi saham berikut:</p>
        <form class="row g-3" id="predict-form">
          <div class="col-md-6 mb-3">
            <label class="form-label">📅 Tanggal</label>
            <input type="date" class="form-control" placeholder="2025-05-08" value="${new Date().toISOString().split('T')[0]}">
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">💰 Harga Pembukaan</label>
            <div class="input-group">
              <span class="input-group-text">Rp.</span>
              <input type="number" class="form-control" placeholder="4212" value="4280.00">
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">📈 Harga Tertinggi</label>
            <div class="input-group">
              <span class="input-group-text">Rp.</span>
              <input type="number" class="form-control" placeholder="4466" value="4310.00">
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">📉 Harga Terendah</label>
            <div class="input-group">
              <span class="input-group-text">Rp.</span>
              <input type="number" class="form-control" placeholder="4145" value="4240.00">
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">📊 Volume Transaksi</label>
            <div class="input-group">
              <span class="input-group-text">Rp.</span>
              <input type="number" class="form-control" placeholder="180000" value="208291800">
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">📏 Harga Penutupan (Adjusted)</label>
            <div class="input-group">
              <span class="input-group-text">Rp.</span>
              <input type="number" class="form-control" placeholder="4212" value="4300.00">
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

  // Method untuk menginisialisasi event listeners
  init() {
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