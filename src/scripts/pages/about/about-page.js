export default class AboutPage {
  async render() {
    return `
      <section class="container mt-4 mb-5">
        <div class="header-section">
          <h1>Tentang Proyek Prediksi Harga Saham BBRI</h1>
          <p>Penerapan Algoritma Least Square untuk menghasilkan prediksi harga saham yang akurat dan mudah diakses</p>
        </div>
      </section>

      <!-- Latar Belakang Section -->
      <section class="container my-5">
        <h2 class="section-title mb-3">📝Latar Belakang Proyek</h2>
        <h3 class="section-subtitle">Inovasi Prediktif untuk Keputusan Investasi yang Lebih Baik</h3>
        <p>Proyek "Penerapan Algoritma Least Square untuk Prediksi Harga Saham Berbasis Web pada Bursa Saham BBRI" lahir dari kebutuhan para investor untuk memiliki alat analisis yang dapat diakses dengan mudah dan memberikan prediksi harga saham yang akurat berdasarkan data historis.</p>
        <p>Saham BBRI (PT Bank Rakyat Indonesia Tbk) dipilih sebagai fokus penelitian karena merupakan salah satu saham blue-chip di Bursa Efek Indonesia dengan likuiditas tinggi dan menjadi pilihan investasi bagi banyak investor ritel maupun institusional.</p>
      </section>

      <!-- Metodologi Penelitian Section -->
      <section class="container my-5">
        <h2 class="section-title mb-3">🔍Metodologi Penelitian</h2>
        <h3 class="section-subtitle">Pendekatan Ilmiah untuk Hasil yang Dapat Diandalkan</h3>
        <p>Penelitian ini menggunakan pendekatan kuantitatif dengan menerapkan Algoritma Least Square untuk menganalisis pola data historis dan menemukan tren yang dapat digunakan untuk memprediksi pergerakan harga saham di masa depan.</p>
        
        <div class="methodology-steps">
          <div class="step-card">
            <h3>Langkah 1</h3>
            <p>Pengumpulan data historis harga saham BBRI dari Investor Relations: Interactive Charts PT. Bank Rakyat Indonesia</p>
          </div>
          <div class="step-card">
            <h3>Langkah 2</h3>
            <p>Pembersihan dan transformasi data untuk analisis kemudian Implementasi Algoritma Least Square untuk menemukan garis tren terbaik</p>
          </div>
          <div class="step-card">
            <h3>Langkah 3</h3>
            <p>Evaluasi model menggunakan metrik MAPE (Mean Absolute Percentage Error)</p>
          </div>
          <div class="step-card">
            <h3>Langkah 4</h3>
            <p>Pengembangan aplikasi web untuk memudahkan akses dan penggunaan model prediksi</p>
          </div>
        </div>
      </section>

      <!-- Detail Teknis Section -->
      <section class="container my-5">
        <h2 class="section-title">⚙️Detail Teknis</h2>
        <div class="tech-details">
          <div class="tech-card">
            <h3 class="section-subtitle">Algoritma Least Square</h3>
            <p>Algoritma Least Square adalah metode statistik yang meminimalkan jumlah kuadrat dari residual untuk menemukan garis tren terbaik yang mewakili data. Dalam konteks prediksi harga saham BBRI, algoritma ini:</p>
            <ul>
              <li>Mengidentifikasi pola pergerakan harga historis</li>
              <li>Menghitung koefisien regresi yang optimal</li>
              <li>Menghasilkan persamaan garis prediksi</li>
            </ul>
          </div>
          
          <div class="tech-card">
            <h3 class="section-subtitle">Evaluasi Akurasi dengan MAPE</h3>
            <p>Mean Absolute Percentage Error (MAPE) digunakan sebagai metrik utama untuk mengevaluasi akurasi model prediksi:</p>
            <ul>
              <li>MAPE mengukur persentase rata-rata selisih absolut antara nilai prediksi dan nilai aktual</li>
              <li>Nilai MAPE yang rendah (<10%) menunjukkan prediksi yang sangat akurat</li>
              <li>Nilai MAPE antara 10-20% menunjukkan prediksi yang baik</li>
              <li>Nilai MAPE >20% mengindikasikan perlunya penyempurnaan model</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Panduan Penggunaan Section -->
      <section class="container my-5">
        <h2 class="section-title mb-3">📊Panduan Penggunaan</h2>
        <h3 class="section-subtitle">Memanfaatkan Prediksi untuk Keputusan Investasi</h3>
        <p>Aplikasi web ini dirancang untuk memberikan pengalaman pengguna yang intuitif dengan langkah-langkah sebagai berikut:</p>
        
        <div class="methodology-steps">
          <div class="step-card">
            <h3>Input Data</h3>
            <p>Masukkan informasi harga saham terbaru (tanggal, harga pembukaan, tertinggi, terendah, volume transaksi, dan nilai rata-rata)</p>
          </div>
          <div class="step-card">
            <h3>Proses Prediksi</h3>
            <p>Sistem akan menganalisis data menggunakan Algoritma Least Square</p>
          </div>
          <div class="step-card">
            <h3>Interpretasi Hasil</h3>
            <p>Hasil prediksi ditampilkan dalam bentuk angka dan grafik untuk memudahkan pemahaman</p>
          </div>
          <div class="step-card">
            <h3>Evaluasi Akurasi</h3>
            <p>Nilai MAPE dan MSE disajikan untuk memberikan gambaran tentang tingkat kepercayaan prediksi</p>
          </div>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #20C997; border-radius:10px; margin-top: 20px;">
          <h3 class="section-subtitle">Catatan Penting:</h3>
          <ul>
            <li>Prediksi yang dihasilkan sebaiknya digunakan sebagai salah satu alat bantu pengambilan keputusan, bukan satu-satunya faktor</li>
            <li>Faktor-faktor eksternal seperti kebijakan moneter, berita perusahaan, dan kondisi makroekonomi juga perlu dipertimbangkan dalam keputusan investasi</li>
          </ul>
        </div>
      </section>

      <!-- Kontak Section -->
      <section class="container my-5">
        <h2 class="section-title">Kami ingin mendengar dari Anda!</h2>
        <h3 class="section-subtitle">Hubungi Pengembang</h3>
        <p>Untuk pertanyaan, saran, atau umpan balik terkait aplikasi prediksi harga saham BBRI, silakan hubungi:</p>
        <div style="background-color: var(--secondary-color); box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px; border-radius: 8px; margin-top: 20px;">
          <h3 class="section-subtitle" style="margin-top: 0;">Achmad Eriel Pangestu</h3>
          <p>Mahasiswa Teknik Informatika<br>UNISNU Jepara</p>
          
          <div class="contact-info">
            <div class="contact-item">
              <p>✉️ Email: 181240000792@unisnu.ac.id</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Kosong, atau bisa diisi event listener, dll.
  }
}
