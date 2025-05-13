export default class PredictTable {
  render() {
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
            <tr>
              <td>2025-05-08</td>
              <td>Rp. 1.505</td>
              <td>Rp. 1.512</td>
              <td class="text-success">+Rp. 7</td>
            </tr>
            <tr>
              <td>2025-05-09</td>
              <td>Rp. 1.510</td>
              <td>Rp. 1.520</td>
              <td class="text-success">+Rp. 10</td>
            </tr>
            <tr>
              <td>2025-05-10</td>
              <td>Rp. 1.520</td>
              <td>Rp. 1.530</td>
              <td class="text-success">+Rp. 10</td>
            </tr>
            <tr>
              <td>2025-05-11</td>
              <td>Rp. 1.530</td>
              <td>Rp. 1.540</td>
              <td class="text-success">+Rp. 10</td>
            </tr>
            <tr>
              <td>2025-05-12</td>
              <td>Rp. 1.540</td>
              <td>Rp. 1.550</td>
              <td class="text-success">+Rp. 10</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  init() {
    console.log('PredictTable initialized');
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