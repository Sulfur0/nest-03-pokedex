import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Controller({ version: '2', path: 'v2/pokemon' })
export class PokemonV2Controller {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':criteria')
  findOne(@Param('criteria') criteria: string) {
    return this.pokemonService.findOne(criteria);
  }

  @Patch(':criteria')
  update(
    @Param('criteria') criteria: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.update(criteria, updatePokemonDto);
  }

  @Delete(':criteria')
  remove(@Param('criteria') criteria: string) {
    return this.pokemonService.remove(criteria);
  }
}
