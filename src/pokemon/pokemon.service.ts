import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { MONGODB_DUPLICATE_ENTRY_ERR } from 'src/common/constants';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private defaultLimit = 5;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.getOrThrow<number>(
      'apiSettings.defaultLimit',
    );
  }
  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase();
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleError(this.create.name, error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    return await this.pokemonModel
      .find()
      .limit(paginationDto.limit ?? this.defaultLimit)
      .skip(paginationDto.offset);
  }

  async findOne(criteria: string) {
    let pokemon;
    if (!isNaN(+criteria)) {
      pokemon = await this.pokemonModel.findOne({ no: criteria });
    }
    if (!pokemon && isValidObjectId(criteria)) {
      pokemon = await this.pokemonModel.findById({ _id: criteria });
    }
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: criteria });
    }
    if (!pokemon) {
      throw new NotFoundException(
        `Pokemon with criteria: ${criteria} not found`,
      );
    }
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      await this.pokemonModel.findByIdAndUpdate(term, updatePokemonDto, {
        newValue: true,
      });
      return updatePokemonDto;
    } catch (error) {
      this.handleError(this.update.name, error);
    }
  }

  async remove(id: string) {
    // no sabemos si se ha eliminado correctamente
    // const res = await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (!deletedCount) {
      throw new NotFoundException(`Pokemon with id: ${id} not found`);
    }
    return;
  }

  private handleError(callerMethod: string, error) {
    let duplicateExceptionMessage;
    let unknownExceptionMessage;
    switch (callerMethod) {
      case 'create':
        duplicateExceptionMessage = `This pokemon already exists ${JSON.stringify(
          error.keyValue,
        )}`;
        unknownExceptionMessage = `Unknown error inserting pokemon`;
        break;
      case 'update':
        duplicateExceptionMessage = `Error while trying to update a pokemon. This pokemon already exists ${JSON.stringify(
          error.keyValue,
        )}`;
        unknownExceptionMessage = `Unknown error updating pokemon`;
        break;
      default:
        break;
    }
    if (error.code === MONGODB_DUPLICATE_ENTRY_ERR) {
      throw new BadRequestException(duplicateExceptionMessage);
    }
    throw new InternalServerErrorException(unknownExceptionMessage);
  }
}
