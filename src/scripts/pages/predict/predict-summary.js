export default class PredictSummary {
  constructor() {
    this.result = null; // Simpan hasil prediksi untuk digunakan di render
  }

  render() {
    const predictionDate = this.result?.predictedPrice.predictedDate ?? '';
    const predictionValue = parseFloat((Math.floor(this.result?.predictedPrice.value * 100) / 100).toFixed(2)) ?? 0;
    const predictionDirection = this.result?.predictedPrice.direction;
    const predictionChange = this.result?.predictedPrice.percentageChange ?? '';

    const summaryText = `Harga saham BBRI diprediksi <b>${predictionDirection === 'up' ? 'naik' : 'turun'}</b> sebesar <b>${Math.abs(predictionChange)}%</b> pada <b>${predictionDate}</b> dibandingkan dengan harga penutupan sebelumnya <br><b>Rp. ${predictionValue}</b>. Ini menunjukkan bahwa ${predictionDirection === 'up' ? 'investor optimis' : 'investor pesimis'} terhadap kinerja saham BBRI di masa mendatang.`;

    return `
      <h2 class="section-title mb-3 text-center">📄 Ringkasan Kesimpulan</h2>
      <h3 class="section-subtitle text-center">Kesimpulan Singkat dari Prediksi yang dihasilkan</h3>
      <div class="quote-text">
        <blockquote class="blockquote">
          <p>${summaryText}</p>
        </blockquote>
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