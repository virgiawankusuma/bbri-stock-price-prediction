import { getActiveRoute } from '../routes/url-parser';
import { generateMainNavigationListTemplate } from '../templates';
import { setupSkipToContent } from '../utils';
import { routes } from '../routes/routes';

export default class App {
  #content;
  #skipLinkButton;

  constructor({ content, skipLinkButton }) {
    this.#content = content;
    this.#skipLinkButton = skipLinkButton;

    this.#init();
  }

  #init() {
    setupSkipToContent(this.#skipLinkButton, this.#content);
  }

  #setupNavigationList() {
    const navlist = document.querySelector('#navlist');
    navlist.innerHTML = generateMainNavigationListTemplate();
  }

  async renderPage() {
    const url = getActiveRoute();
    const route = routes[url];

    // Get page instance
    const page = route();

    if (!document.startViewTransition) {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
 
      return;
    }

     // Update DOM with view transition
    document.startViewTransition(async () => {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
    });

    // this.#content.innerHTML = await page.render();
    // await page.afterRender();

    scrollTo({ top: 0, behavior: 'instant' });
    this.#setupNavigationList();
  }
}
