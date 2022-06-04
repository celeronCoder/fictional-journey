export interface Response<T> {
  status: 'success' | 'error';
  code: number;
  message: string;
  data?: T;
  error?: any;
}
