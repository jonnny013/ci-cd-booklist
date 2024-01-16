import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from '../library-frontend/src/App'

test('renders content', () => {
  render(<App />)

  const elementLogin = screen.getByText('Login')

  expect(elementLogin).toBeDefined()
})
