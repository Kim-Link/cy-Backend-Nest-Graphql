import {
  Body,
  Controller,
  Get,
  // Delete,
  // Get,
  // Param,
  // Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CatsService } from '../services/cats.service';
// import { Cat } from '../schemas/cat.schema';
import { CreateCatDto } from '../dto/create-cat.dto';
import { Cat } from '../entities/cat.entity';
// import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // @Get()
  // getAll(): Movie[] {
  //   return this.catsService.getAll();
  // }

  // @Get(':id')
  // getOne(@Param('id') movieId: number): Movie {
  //   return this.moviesService.getOne(movieId);
  // }

  @Get()
  @ApiBearerAuth()
  getAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateCatDto })
  create(@Body() catData: CreateCatDto) {
    return this.catsService.create(catData);
  }

  // @Delete(':id')
  // remove(@Param('id') movieId: number): Movie {
  //   return this.moviesService.deleteOne(movieId);
  // }

  // @Patch(':id')
  // update(@Param('id') movieId: number, @Body() movieData: UpdateMovieDto) {
  //   return this.moviesService.update(movieId, movieData);
  // }
}
