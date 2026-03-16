import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Firebase
vi.mock('@/src/firebase', () => ({
  auth: {},
  db: {},
}));

// Mock Google GenAI
vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn(),
}));
