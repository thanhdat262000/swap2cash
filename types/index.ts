export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
  meta?: any;
}

declare global {
  interface Window {
    deBridge: any; // 👈️ turn off type checking
  }
}