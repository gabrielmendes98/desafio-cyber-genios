import { FC, ReactElement, ReactNode } from 'react';
import { configure, render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PreloadedState } from '@reduxjs/toolkit';
import { AppStore, RootState, setupStore } from './store';

configure({ testIdAttribute: 'id' });

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

const customRender = (
  ui: ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) => {
  const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

/* eslint-disable */
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
/* eslint-enable */
