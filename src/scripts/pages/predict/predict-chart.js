import Chart from 'chart.js/auto';
import getActualPredictionPrice  from '../../utils/get_actual_prediction_price.js';

export default class PredictChart {
  costructor() {
    this.result = null; // untuk nyimpan data hasil prediksi
  }

  render() {
    return `
      <h2 class="section-title mb-3 text-center">📈 Grafik Perbandingan Harga</h2>
      <h3 class="section-subtitle text-center">Visualisasi Tren: Harga Aktual vs Prediksi</h3>
      <div class="chart-container">
        <canvas id="predict-chart" width="400" height="150"></canvas>
      </div>
    `;
  }

  init() {
    getActualPredictionPrice(this.result);
    const { labels, actualPrices, predictedPrices } = getActualPredictionPrice(this.result);

    const ctx = document.getElementById('predict-chart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels : labels.reverse(),
        // labels: 
        datasets: [
          {
            label: 'Harga Aktual',
            data: actualPrices.reverse(),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
          {
            label: 'Harga Prediksi',
            data: predictedPrices.reverse(),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
    const canvas = document.getElementById('predict-chart');
    const tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip';
    tooltip.style.position = 'absolute';

    canvas.parentNode.appendChild(tooltip);
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