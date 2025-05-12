import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import PredictPage from '../pages/predict/predict-page';

export const routes = {
  '/': () => new HomePage(),
  '/predict': () => new PredictPage(),
  '/about': () => new AboutPage(),

};