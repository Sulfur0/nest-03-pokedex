import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller({ version: '2', path: 'v2/pokemon' })
export class PokemonV2Controller {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
    // @Param('limit', ParseIntPipe) limit: PaginationDto,
    // @Param('offset', ParseIntPipe) offset: PaginationDto,
    /**
     * Al hacer la paginación con los Params individualmente y quitando
     * la transformación implícita de los strings a number en main.ts
     * nos resulta en:
     * "message": "Validation failed (numeric string is expected)",
     * "error": "Bad Request"
     */
  ) {
    // const p = new PaginationDto(limit, offset);
    // console.log(paginationDto);
    return this.pokemonService.findAll(paginationDto);
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
  remove(@Param('criteria', ParseMongoIdPipe) criteria: string) {
    return this.pokemonService.remove(criteria);
  }
}
