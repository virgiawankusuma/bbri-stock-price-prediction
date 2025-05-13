export default class PredictSummary {
  render() {
    return `
      <h2 class="section-title mb-3 text-center">📄 Ringkasan Kesimpulan</h2>
      <h3 class="section-subtitle text-center">Kesimpulan Singkat dari Prediksi yang dihasilkan</h3>
      <div class="quote-text">
        <blockquote class="blockquote">
          <p>Harga saham BBRI diprediksi naik sebesar 0.20% pada 9 Mei 2025 dibandingkan dengan harga penutupan sebelumnya (Rp 1.505)</p>
        </blockquote>
      </div>
    `;
  }

  init() {
    console.log('PredictSummary initialized');
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