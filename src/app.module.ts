import { Module } from '@nestjs/common';
import { ExerciseController } from './application/controller/exercise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from './ormconfig'
import GetAllExercisesUseCase from './application/usecase/getallexercises.usecase';
import { ExerciseService } from './domain/service/exercise.service';
import { ExerciseRepository } from './infrastructure/database/repositories/exercise.repository';
import UserEntity from './infrastructure/database/entities/user.entity';
import ExerciseEntity from './infrastructure/database/entities/exercise.entity';
import CreateExerciseUseCase from './application/usecase/createexercise.usecase';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...connectionOptions,
      autoLoadEntities: true
    }),
    TypeOrmModule.forFeature([ExerciseEntity, UserEntity])
  ],
  controllers: [ExerciseController],
  providers: [
    {
      provide: 'IExerciseService',
      useClass: ExerciseService
    },
    {
      provide: 'IExerciseRepository',
      useClass: ExerciseRepository
    },
    GetAllExercisesUseCase, 
    CreateExerciseUseCase
  ]
})
export class AppModule {}
