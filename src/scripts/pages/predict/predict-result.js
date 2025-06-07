import PredictChart from "./predict-chart";
import PredictTable from "./predict-table";
import PredictSummary from "./predict-summary";
import PredictEvaluation from "./predict-evaluation";

export default class PredictResult {
  constructor() {
    this.predictChart = new PredictChart();
    this.predictTable = new PredictTable();
    this.predictSummary = new PredictSummary();
    this.predictEvaluation = new PredictEvaluation();

    this.result = null; // untuk nyimpan data hasil prediksi
  }

  render() {
    const predictionValue = parseFloat((Math.floor(this.result?.predictedPrice.value * 100) / 100).toFixed(2)) ?? 0;
    const predictionDirection = this.result?.predictedPrice.direction;
    const predictionDirectionIcon = predictionDirection === 'up' ? 'fa-caret-up text-success' : 'fa-caret-down text-danger';
    const predictionDate = this.result?.predictedPrice.predictedDate ?? '';
    const predictionChange = this.result?.predictedPrice.percentageChange ?? '';

    return `
      <section class="container my-5">
        <div class="card pt-4 shadow-sm">
          <div class="card-body">
            <h2 class="section-title mb-3 text-center">📊 Hasil Prediksi</h2>
            <h3 class="section-subtitle text-center">Perkiraan Harga Saham BBRI Mendatang</h3>

            <div class="text-center mb-3">
              <div class="prediction-value">
                Rp. ${predictionValue} <i class="fa-solid ${predictionDirectionIcon}"></i>
              </div>
              <p class="text-muted">
                ${predictionDate}
              </p>
              <div class="mb-3 ${predictionDirection === 'up' ? 'text-success' : 'text-danger'}"> 
                ${predictionDirection === 'up' ? '+' : ''} ${predictionChange}% dari harga penutupan sebelumnya
              </div>
              <div class="d-flex justify-content-center gap-2 mt-3">
                <button class="btn btn-primary" id="predict-detail-button">Lihat Detail <i class="fa-solid fa-plus"></i></button>
                <button class="btn btn-primary visually-hidden" id="predict-hide-detail-button">Sembunyikan Detail <i class="fa-solid fa-minus"></i></button>
                <button class="btn btn-outline-primary" id="new-predict-button">Prediksi Baru</button>
              </div>
            </div>

            <div class="my-5" id="predict-chart-container"></div>
            <div class="my-5" id="predict-table-container"></div>
            <div class="my-5" id="predict-summary-container"></div>
            <div class="my-5" id="predict-evaluation-container"></div>
          </div>
        </div>
      </section>
    `;
  }

  init() {
    // Inisialisasi event listeners
    const detailBtn = document.getElementById('predict-detail-button');
    const hideDetailBtn = document.getElementById('predict-hide-detail-button');
    const newPredBtn = document.getElementById('new-predict-button');

    if (detailBtn) {
      detailBtn.addEventListener('click', () => {
        this.predictChart.mount('predict-chart-container', this.result);
        this.predictTable.mount('predict-table-container', this.result);
        this.predictSummary.mount('predict-summary-container', this.result);
        this.predictEvaluation.mount('predict-evaluation-container', this.result);
        console.log('Detail button clicked');

        detailBtn.classList.add('visually-hidden');
        hideDetailBtn.classList.remove('visually-hidden');
      });
    }

    if (hideDetailBtn) {
      hideDetailBtn.addEventListener('click', () => {
        const chartContainer = document.getElementById('predict-chart-container');
        const tableContainer = document.getElementById('predict-table-container');
        const summaryContainer = document.getElementById('predict-summary-container');
        const evaluationContainer = document.getElementById('predict-evaluation-container');

        chartContainer.innerHTML = '';
        tableContainer.innerHTML = '';
        summaryContainer.innerHTML = '';
        evaluationContainer.innerHTML = '';

        console.log('Hide detail button clicked');

        detailBtn.classList.remove('visually-hidden');
        hideDetailBtn.classList.add('visually-hidden');
      });
    }

    if (newPredBtn) {
      newPredBtn.addEventListener('click', () => {
        console.log('New prediction button clicked');
        // Implementasi logika untuk membuat prediksi baru
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // Method untuk merender komponen ke container
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
}