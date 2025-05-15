export default class HomePage {
  async render() {
    return `
      <section class="container my-4">
        <div class="hero-section">
          <div class="container">
            <h1 class="hero-title">Prediksi Harga Saham BBRI dengan Algoritma Least Square</h1>
            <p class="hero-description">Bantu keputusan investasimu dengan prediksi harga saham berbasis data historis dan algoritma Least Square untuk estimasi yang lebih terarah</p>
            <button class="btn btn-predict">Prediksi Sekarang</button>
          </div>
        </div>
      </section>

      <section class="container my-5">
        <h2 class="section-title text-center mb-3">Fondasi Prediksi:<br>Least Square & Evaluasi Akurasi</h2>
        <div class="row align-items-center"> 
          <div class="col-lg-6">
            <!-- Feature Cards -->
            <div class="feature-card card-blue">
              <div class="row">
                <div class="col-3 col-sm-2">
                  <div class="feature-number text-primary">01</div>
                </div>
                <div class="col-9 col-sm-10">
                  <h4>Least Square: Dasar Perhitungan Prediksi</h4>
                  <p>Metode Least Square digunakan untuk menemukan tren harga saham dengan mencari garis terbaik yang mewakili pola data historis.</p>
                </div>
              </div>
            </div>
            
            <div class="feature-card card-green">
              <div class="row">
                <div class="col-3 col-sm-2">
                  <div class="feature-number text-success">02</div>
                </div>
                <div class="col-9 col-sm-10">
                  <h4>Cara Kerja Prediksi: Dari Data ke Hasil</h4>
                  <p>Prediksi dilakukan dengan memasukkan data historis, menerapkan perhitungan Least Square, dan menghasilkan estimasi harga saham di masa depan.</p>
                </div>
              </div>
            </div>
            
            <div class="feature-card card-pink">
              <div class="row">
                <div class="col-3 col-sm-2">
                  <div class="feature-number text-danger">03</div>
                </div>
                <div class="col-9 col-sm-10">
                  <h4>Seberapa Akurat Prediksi Ini?</h4>
                  <p>Akurasi dihitung menggunakan Mean Absolute Percentage Error (MAPE), yang membandingkan prediksi dengan harga aktual untuk mengukur tingkat kesalahan model.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-lg-6 illustration-container">
            <img src="/images/illustration2.png" alt="Ilustrasi Analisis Data" class="illustration">
          </div>
        </div>
      </section>

      <section class="container my-5">
        <h2 class="section-title text-center mb-3">Informasi Pengembang & Sumber Data</h2>
        
        <div class="row justify-content-center">
          <div class="col-md-6 mb-4">
            <div class="info-section">
              <h4>👨‍💻 Achmad Eriel Pangestu</h4>
              <p class="text-muted">Mahasiswa Teknik Informatika, UNISNU Jepara</p>
              
              <h5 class="mt-4">📌 Tujuan Pengembangan</h5>
              <p>Sebagai pemenuhan tugas akhir/skripsi pengembang dan Membantu investor memprediksi harga saham berbasis web dengan Algoritma Least Square untuk dan MAPE sebagai evaluasi akurasi.</p>
            </div>
          </div>
          
          <div class="col-md-6 mb-4">
            <div class="info-section">
              <h4>📊 Sumber Data Saham</h4>
              <p>Data historis harga saham diperoleh dari Investor Relations: Interactive Charts PT. Bank Rakyat Indonesia<a class="btn m-0 p-0" href="https://www.ir-bri.com/stock_chart_interactive.html" target="_blank">↗️</a></p>
              
              <h5 class="mt-4">⚙️ Metode Pengolahan</h5>
              <p>Data dikumpulkan, diolah, dan digunakan dalam model prediksi berbasis Least Square</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    document.title = 'BBRI Stock Price Prediction';
    
    const predictButton = document.querySelector('.btn-predict');
    predictButton.addEventListener('click', () => {
      window.location.href = '#/predict';
    });
  }
}
