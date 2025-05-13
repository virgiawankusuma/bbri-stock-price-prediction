export default class PredictEvaluation {
  render() {
    return `
      <h2 class="section-title mb-3 text-center">🔬Evaluasi Akurasi</h2>
      <h3 class="section-subtitle text-center">Mengukur Seberapa Dekat Prediksi dengan Kenyataan</h3>
      <div class="metric-box">
        <div class="row mb-2">
          <div class="col-md-8">Nilai MAPE (Mean Absolute Percentage Error):</div>
          <div class="col-md-4 text-primary fw-bold">2.8%</div>
        </div>
        <div class="row mb-3">
          <div class="col-md-8">Nilai MSE (Mean Squared Error)</div>
          <div class="col-md-4 text-primary fw-bold">32.23</div>
        </div>
        <p class="text-muted mb-0 small">
          Hasil Prediksi saham berhasil menunjukkan tingkat akurasi yang tinggi dengan 
          nilai MAPE <10% dan MSE <50. Anda dapat mengandalkan hasil prediksi ini untuk 
          membuat keputusan investasi yang lebih cerdas dan terinformasi.
        </p>
      </div>
    `;
  }

  init() {
    console.log('PredictEvaluation initialized');
  }

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
}