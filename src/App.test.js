import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText('create');
  expect(linkElement).toBeInTheDocument();
});

it('renders react link', () => {
  const {getByText} = render(<App/>);
  const element = getByText('jeremiahlena13');
  expect(element).toBeInTheDocument();
})
