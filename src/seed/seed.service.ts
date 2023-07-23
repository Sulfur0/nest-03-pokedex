import { AxiosAdapter } from './../common/adapters/axios.adapter';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { PokeAPIResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  // private readonly axios: AxiosInstance = axios;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly axiosAdapter: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.clearDB();
    const data = await this.axiosAdapter.get<PokeAPIResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    const pokemons = data.results.map((pokemon) => {
      const segments = pokemon.url.split('/');
      return {
        name: pokemon.name,
        no: segments[segments.length - 2],
      };
    });
    await this.pokemonModel.insertMany(pokemons);
    return { status: 'success', message: 'Successfully seeded the database' };
  }

  async clearDB() {
    return await this.pokemonModel.deleteMany({});
  }
}
