import {
  generateLoaderAbsoluteTemplate
} from '../../templates';

export default class PredictPage {

  async render() {
    return `
      <section>
        <div>
          <h1 class="section-title">Predict</h1>
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
    document.title = 'Prediksi Harga - BBRI Stock Price Prediction';
  }
}
