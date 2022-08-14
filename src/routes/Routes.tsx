import { Routes as RouterDomRoutes, Route } from 'react-router-dom';
import Counter from 'pages/Counter';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';

// customize/improve this file and its folder structure based on your project requirements

const Routes = () => (
  <RouterDomRoutes>
    <Route path="/" element={<Home />} />
    <Route path="/counter" element={<Counter />} />
    <Route path="*" element={<NotFound />} />
  </RouterDomRoutes>
);

export default Routes;
