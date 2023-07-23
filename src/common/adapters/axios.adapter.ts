import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios;
  async get<T>(url: string): Promise<any> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new HttpException('Error in GET request', error);
    }
  }
}
