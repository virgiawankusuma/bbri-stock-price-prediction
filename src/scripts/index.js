// CSS imports
import '../styles/main.css';
import '../styles/responsives.css';

// Components
import App from './pages/app';

// Fungsi untuk fetch data BBRI dari Yahoo Finance
async function fetchBBRIOncePerDay() {
  const today = new Date().toISOString().slice(0, 10);
  const savedDate = localStorage.getItem('fetchDate');
  const savedData = localStorage.getItem('fetchData');

  if (savedDate === today && savedData) {
    // console.log('✅ Data sudah ada di localStorage hari ini');
    alert('✅ Data sudah ada di localStorage hari ini');
    return JSON.parse(savedData);
  }

  // Konversi string '2022-01-01' ke timestamp (Unix epoch dalam detik)
  const startDateStr = '2022-01-01';
  const startDate = Math.floor(new Date(startDateStr).getTime() / 1000);

  // Ambil timestamp sekarang (hari ini) dalam detik
  const endDate = Math.floor(Date.now() / 1000);

  const originalUrl = `https://query1.finance.yahoo.com/v8/finance/chart/BBRI.JK?events=capitalGain%7Cdiv%7Csplit&formatted=true&includeAdjustedClose=true&interval=1d&period1=${startDate}&period2=${endDate}&symbol=BBRI.JK&userYfid=true&lang=en-US&region=US`;

  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(originalUrl)}`;

  try {
    const res = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    localStorage.setItem('fetchDate', today);
    localStorage.setItem('fetchData', JSON.stringify(data));

    // console.log('✅ Data berhasil di-fetch dan disimpan di localStorage');
    alert('✅ Data berhasil di-fetch dan disimpan di localStorage');
    // cek isi localStorage fetchData
    return data;
  } catch (error) {
    // console.error('❌ Gagal fetch data:', error);
    alert('❌ Gagal fetch data:', error);
    return null;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // 👉 Ambil data BBRI dan simpan di localStorage jika belum hari ini
  const bbriData = await fetchBBRIOncePerDay();

  // Kalau kamu butuh datanya untuk render halaman, bisa lempar ke App
  const app = new App({
    content: document.getElementById('main-content'),
    skipLinkButton: document.getElementById('skip-link'),
    bbriData: bbriData, // misalnya kamu tambahkan param ini di constructor App
  });

  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });
});
