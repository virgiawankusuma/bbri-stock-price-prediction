import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

export default class PredictChart {
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
    const ctx = document.getElementById('predict-chart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2025-05-08', '2025-05-09', '2025-05-10', '2025-05-11', '2025-05-12'],
        datasets: [
          {
            label: 'Harga Aktual',
            data: [1505, 1510, 1520, 1530, 1540],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
          {
            label: 'Harga Prediksi',
            data: [1512, 1520, 1530, 1540, 1550],
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