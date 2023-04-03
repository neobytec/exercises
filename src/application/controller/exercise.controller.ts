import { BadRequestException, Body, Controller, Get, InternalServerErrorException, NotFoundException, Post, Req } from '@nestjs/common';
import NotFoundError from '../../domain/error/notfound.error';
import ValidationError from '../../domain/error/validation.error';
import ExerciseDTO from '../dto/exercise.dto';
import ExerciseInputDTO from '../dto/exerciseinput.dto';
import CreateExerciseUseCase from '../usecase/createexercise.usecase';
import GetAllExercisesUseCase from '../usecase/getallexercises.usecase';

@Controller('exercise')
export class ExerciseController {
  constructor(
    private readonly getAllExercisesUseCase: GetAllExercisesUseCase,
    private readonly createExerciseUseCase: CreateExerciseUseCase
  ) {}

  @Get()
  getAll(): Promise<ExerciseDTO[]> {
    return this.getAllExercisesUseCase.execute();
  }

  @Post()
  createExercise(@Body() body: ExerciseInputDTO): Promise<ExerciseDTO|void> {
    return this.createExerciseUseCase.execute(body).catch(error => {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message)
      } else if (error instanceof ValidationError) { 
        throw new BadRequestException(error.message)
      } else {
        throw new InternalServerErrorException(error.message)
      }
    })
  }
}
