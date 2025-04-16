import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock next/router
vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    query: {},
  }),
})); 