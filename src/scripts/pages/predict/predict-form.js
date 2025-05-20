import PredictResult from "./predict-result";

export default class PredictForm {
  constructor() {
    this.predictResult = new PredictResult();
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
            <input type="date" class="form-control" placeholder="2025-05-08">
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">💰 Harga Pembukaan</label>
            <div class="input-group">
              <span class="input-group-text">Rp.</span>
              <input type="text" class="form-control" placeholder="1505">
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">📈 Harga Tertinggi</label>
            <div class="input-group">
              <span class="input-group-text">Rp.</span>
              <input type="text" class="form-control" placeholder="1515">
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">📉 Harga Terendah</label>
            <div class="input-group">
              <span class="input-group-text">Rp.</span>
              <input type="text" class="form-control" placeholder="1490">
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">📊 Volume Transaksi</label>
            <div class="input-group">
              <span class="input-group-text">Rp.</span>
              <input type="text" class="form-control" placeholder="180.000">
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">📏 Nilai Rata-rata</label>
            <div class="input-group">
              <span class="input-group-text">Rp.</span>
              <input type="text" class="form-control" placeholder="1507">
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
          <span>/</span>
          <button class="btn btn-outline-primary d-flex align-items-center" id="upload-button" type="button">
            <i class="bi bi-upload me-2"></i> Upload File CSV
          </button>
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

    predictButton.addEventListener('click', (event) => {
      event.preventDefault(); // Mencegah pengiriman form default
      // this.predictResult.mount('predict-result-container');
      // catch data from form
      const formData = {
        tanggal: inputFields[0].value,
        open: inputFields[1].value,
        high: inputFields[2].value,
        low: inputFields[3].value,
        volume: inputFields[4].value,
        average: inputFields[5].value
      };

      // Validasi data
      this.validateForm(formData);

      console.log('Form Data:', formData);
      
      // Implementasi logika untuk mengirim data
    });

    uploadButton.addEventListener('click', () => {
      console.log('Upload button clicked');
      // Implementasi logika untuk mengupload file CSV
    });
  }

  validateForm(formData) {
  // Validasi data kosong
    for (const field in formData) {
      if (!formData[field]) {
        alert(`Field ${field} tidak boleh kosong`);
        return;
      }
    }

    // Validasi numerik
    const numericFields = ['open', 'high', 'low', 'volume', 'average'];
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
    const negativeFields = ['open', 'high', 'low', 'average'];
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
    // Jika semua validasi berhasil, lanjutkan dengan pengiriman data
    console.log('Semua validasi berhasil. Data siap untuk dikirim.');
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