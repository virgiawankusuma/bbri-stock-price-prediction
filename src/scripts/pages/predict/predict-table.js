import getActualPredictionPrice  from '../../utils/get_actual_prediction_price.js';

export default class PredictTable {
  constructor() {
    this.result = null; // untuk nyimpan data hasil prediksi
  }
  
  render() {
    getActualPredictionPrice(this.result);
    const { labels, actualPrices, predictedPrices } = getActualPredictionPrice(this.result);

    return `
      <h2 class="section-title mb-3 text-center">📉 Tabel Data Prediksi</h2>
      <h3 class="section-subtitle text-center">Detail Angka Prediksi untuk Transparansi</h3>
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Tanggal</th>
              <th scope="col">Harga Aktual</th>
              <th scope="col">Harga Prediksi</th>
              <th scope="col">Selisih</th>
            </tr>
          </thead>
          <tbody>
            ${labels.map((label, index) => `
              <tr>
                <td>${label}</td>
                <td>Rp. ${actualPrices[index] || '-'}</td>
                <td>Rp. ${predictedPrices[index] || '-'}</td>
                <td class="${predictedPrices[index] > actualPrices[index] ? 'text-success' : 'text-danger'}">
                  ${predictedPrices[index] ? `Rp. ${Math.abs(predictedPrices[index] - actualPrices[index])}` : '-'}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
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
    
    this.result = result; // Simpan hasil prediksi untuk digunakan di render
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