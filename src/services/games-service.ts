import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Game from '../entities/game.entity';
import CreateGameDto from '../dto/games/create-game.dto';
import UpdateGameDto from '../dto/games/update-game.dto';

@Injectable()
export default class GamesService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>
  ) {}

  async create(createGameDto: CreateGameDto) {
    const game = this.gameRepository.create(createGameDto);
    await this.gameRepository.save(game);
    return this.findOne(game.id);
  }

  async findAll() {
    return this.gameRepository.find({
      select: ['id', 'title', 'price', 'tags', 'releaseDate']
    });
  }

  async findOne(id: number) {
    return this.gameRepository.findOneOrFail(id, {
      select: ['id', 'title', 'price', 'tags', 'releaseDate']
    }).catch(() => {
      throw new NotFoundException()
    });
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    await this.gameRepository.update(id, updateGameDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.gameRepository.delete(id).catch(() => {
      throw new NotFoundException();
    });
  }

}
