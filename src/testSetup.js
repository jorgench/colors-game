import '@testing-library/jest-dom'
import { act } from '@testing-library/react'
import { mockAnimationsApi, configMocks } from 'jsdom-testing-mocks'
mockAnimationsApi()

configMocks({
  act,
})
