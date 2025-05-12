export function generateLoaderTemplate() {
  return `
    <div class="loader"></div>
  `;
}

export function generateLoaderAbsoluteTemplate() {
  return `
    <div class="loader loader-absolute"></div>
  `;
}

export function generateMainNavigationListTemplate() {
  const activeRoute = window.location.hash.split('/')[1];
  const activeClass = (route) => (activeRoute === route ? 'active' : '');
  return `
    <li class="nav-item"><a class="nav-link ${activeClass('')} " href="#/">Beranda</a></li>
    <li class="nav-item"><a class="nav-link ${activeClass('predict')}" href="#/predict">Prediksi Harga</a></li>
    <li class="nav-item"><a class="nav-link ${activeClass('about')}" href="#/about">Tentang</a></li>
  `;

}