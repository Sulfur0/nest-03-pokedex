import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeAPIResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokeAPIResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    return data.results.map((pokemon) => {
      const segments = pokemon.url.split('/');
      return {
        name: pokemon.name,
        no: segments[segments.length - 2],
      };
    });
  }
}
