// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

jest.mock('@iconify/react', () => ({
  __esModule: true,
  default: jest.requireActual('@iconify/react'),
  ...jest.requireActual('@iconify/react'),
  Icon: jest.fn(),
}));

window.URL.createObjectURL = () => 'fake.url.com';

const portalRoot = document.createElement('div');
portalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(portalRoot);

// @ts-ignore
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
