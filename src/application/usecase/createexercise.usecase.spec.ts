import { Test, TestingModule } from '@nestjs/testing';
import ExerciseEntity from '../../infrastructure/database/entities/exercise.entity';
import { ExerciseService } from '../../domain/service/exercise.service';
import { ExerciseRepository } from '../../infrastructure/database/repositories/exercise.repository';
import CreateExerciseUseCase from './createexercise.usecase';
import { getRepositoryToken } from '@nestjs/typeorm';
import UserEntity from '../../infrastructure/database/entities/user.entity';
import { plainToClass } from 'class-transformer';
import ExerciseInputDTO from '../dto/exerciseinput.dto';
import { resolve } from 'path';
import NotFoundError from '../../domain/error/notfound.error';
import ValidationError from '../../domain/error/validation.error';
import ExerciseDTO from '../dto/exercise.dto';

describe('CreateExerciseUseCase', () => {
    let createExerciseUseCase: CreateExerciseUseCase
    const user: UserEntity = plainToClass(UserEntity, {
        id: '0c05c641-1880-4c7b-9c44-40c27e85e9be', 
        name: 'Pedro'
    })
    const exercisedCreatedEntity: ExerciseEntity = plainToClass(ExerciseEntity, {
        content: 'Exercise created'
    })

    const mockedExerciseEntityRepository = {
        find: jest.fn((id) => Promise.resolve(null)),
        findBy: jest.fn((id) => {
            let exerciseList: ExerciseEntity[] = []

            const idString = JSON.stringify(id)
            if (idString.indexOf('"_value":"0c05c641-1880-4c7b-9c44-40c27e85e9be"') === -1) {
                return Promise.resolve(exerciseList)
            }

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
        create: jest.fn((item) => {
            return Promise.resolve(plainToClass(ExerciseEntity, {
                user_id: item.user_id,
                content: item.content,
            }))
        }),
        save: jest.fn((item) => {
            const exerciseEntity = plainToClass(ExerciseEntity, {
                id: Math.floor(Math.random() * 10000), 
                user_id: item.user.id,
                content: item.content,
                created_at: new Date(),
                user: plainToClass(UserEntity, {
                    id: item.user.id,
                    name: 'Miguel'
                })
            })
            return Promise.resolve(exerciseEntity)
        })
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
                CreateExerciseUseCase
            ],
        }).compile();

        createExerciseUseCase = app.get<CreateExerciseUseCase>(CreateExerciseUseCase)
    })

    it('User does not exists', async () => {

        const exerciseInputDTO = new ExerciseInputDTO('empty', 'Exercise number 1')

        await expect(createExerciseUseCase.execute(exerciseInputDTO)).rejects.toThrowError(NotFoundError)
    })

    it('Throw validation error when content is longer than 100', async () => {
        const exerciseInputDTO = new ExerciseInputDTO('1234', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id dictum nisl. Morbi commodo lacus accumsan.')

        await expect(createExerciseUseCase.execute(exerciseInputDTO)).rejects.toThrowError(ValidationError)
    }) 

    it('Throw validation error message longer than 100', async () => {
        const exerciseInputDTO = new ExerciseInputDTO('1234', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id dictum nisl. Morbi commodo lacus accumsan.')

        await expect(createExerciseUseCase.execute(exerciseInputDTO)).rejects.toThrow('Exercise content can not be longer than 100 characteres')
    }) 

    it('No more than 10 exercises', async () => {
        const exerciseInputDTO = new ExerciseInputDTO('0c05c641-1880-4c7b-9c44-40c27e85e9be', 'Lorem ipsum dolor sit amet')

        await expect(createExerciseUseCase.execute(exerciseInputDTO)).rejects.toThrowError(ValidationError)
        await expect(createExerciseUseCase.execute(exerciseInputDTO)).rejects.toThrow('Exercise not created, 10 exercises for user: 0c05c641-1880-4c7b-9c44-40c27e85e9be')
    })

    it('Create exercise', async () => {
        const exerciseInputDTO = new ExerciseInputDTO('1234', 'Lorem ipsum dolor sit amet')

        const exerciseDTO = await createExerciseUseCase.execute(exerciseInputDTO)
        expect(exerciseDTO.content).toBe(exerciseInputDTO.content)
        expect(exerciseDTO.user_id).toBe(exerciseInputDTO.user_id)
    })
})