import CoreLayout from '../layouts/CoreLayout';

export const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  childRoutes: [],
});

export default createRoutes;
