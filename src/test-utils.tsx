import { FC, ReactElement, ReactNode } from 'react';
import { configure, render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { PreloadedState } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from 'common/providers/Theme';
import { AppStore, RootState, setupStore } from './store';

configure({ testIdAttribute: 'id' });

const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: {
  condition: boolean;
  wrapper: (children: JSX.Element) => JSX.Element;
  children: JSX.Element;
}) => (condition ? wrapper(children) : children);

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
  route?: string;
  renderWithRouter?: boolean;
}

const customRender = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    renderWithRouter = false,
    route = '/',
    ...renderOptions
  }: ExtendedRenderOptions = {},
) => {
  if (renderWithRouter) {
    window.history.pushState({}, 'Test page', route);
  }

  const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
    <ConditionalWrapper
      condition={renderWithRouter}
      wrapper={children => <BrowserRouter>{children}</BrowserRouter>}
    >
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </ConditionalWrapper>
  );

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

/* eslint-disable */
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
/* eslint-enable */
