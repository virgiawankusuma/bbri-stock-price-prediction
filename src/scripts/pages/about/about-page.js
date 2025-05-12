import {
  generateLoaderAbsoluteTemplate
} from '../../templates';

export default class AboutPage {

  async render() {
    return `
      <section>
        <div>
          <h1 class="section-title">About</h1>
        </div>
      </section>

      <section class="container">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec a diam lectus. Sed sit amet ipsum mauris.
          Maecenas congue ligula ac quam viverra nec
          faucibus justo commodo. Aliquam erat volutpat.
        </p>
      </section>
    `;
  }

  async afterRender() {
    // Kosong, atau bisa diisi event listener, dll.
  }

  showLoading() {
    document.getElementById('reports-list-loading-container').innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById('reports-list-loading-container').innerHTML = '';
  }
}
