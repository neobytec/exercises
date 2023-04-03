import { Test, TestingModule } from "@nestjs/testing";
import { ExerciseService } from "../../domain/service/exercise.service";
import { ExerciseRepository } from "../../infrastructure/database/repositories/exercise.repository";
import GetAllExercisesUseCase from "./getallexercises.usecase";
import { getRepositoryToken } from '@nestjs/typeorm';
import ExerciseEntity from "../../infrastructure/database/entities/exercise.entity";
import UserEntity from "../../infrastructure/database/entities/user.entity";
import { plainToClass } from 'class-transformer';

describe('GetAllExercises', () => {
    let getAllExercisesUseCase: GetAllExercisesUseCase

    const user: UserEntity = plainToClass(UserEntity, {
        id: '0c05c641-1880-4c7b-9c44-40c27e85e9be', 
    })

    const mockedExerciseEntityRepository = {
        find: jest.fn(() => {
            let exerciseList: ExerciseEntity[] = []

            for (let i = 0; i < 10; i++) {
                exerciseList.push(
                    plainToClass(ExerciseEntity, {
                        id: i, 
                        user_id: '0c05c641-1880-4c7b-9c44-40c27e85e9be',
                        content: 'Exercise ' + i,
                        created_at: new Date(),
                        user: user
                    })
                )
            }

            return Promise.resolve(exerciseList)
        }),
    }
    
    const mockedUserEntityRepository = {
        findOneBy: jest.fn((id) => {
            const idString = JSON.stringify(id)
            if (idString.indexOf('"_value":"empty"') !== -1) {
                return Promise.resolve(null)
            }

            return Promise.resolve(user)
        }),
        preload: jest.fn((id) => {
            return Promise.resolve(user)
        })
    }

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: 'IExerciseService',
                    useClass: ExerciseService
                },
                {
                    provide: 'IExerciseRepository',
                    useClass: ExerciseRepository
                },
                {
                    provide: getRepositoryToken(ExerciseEntity),
                    useValue: mockedExerciseEntityRepository
                },
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: mockedUserEntityRepository
                },
                GetAllExercisesUseCase
            ],
        }).compile();

        getAllExercisesUseCase = app.get<GetAllExercisesUseCase>(GetAllExercisesUseCase)
    })

    it('Get exercises', async () => {
        const exerciseDTOList = await getAllExercisesUseCase.execute()
        expect(exerciseDTOList).toHaveLength(10)
    })
})