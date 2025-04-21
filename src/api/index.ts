import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3333', // URL base da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default async function mutator<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await instance(config);
  return response.data; // Retorna apenas os dados, não o AxiosResponse
}