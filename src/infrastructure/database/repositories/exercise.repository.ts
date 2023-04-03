import { Injectable } from '@nestjs/common';
import IExerciseDTO from 'src/domain/dto/exercisedto.interface';
import { Repository, Equal } from 'typeorm';
import ExerciseEntity from '../entities/exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from '../entities/user.entity';
import IUserDTO from 'src/domain/dto/userdto.interface';
import IExerciseRepository from 'src/domain/outgoing/repository.interface';

@Injectable()
export class ExerciseRepository implements IExerciseRepository {

    constructor(
        @InjectRepository(ExerciseEntity)
        private readonly exerciseRepository: Repository<ExerciseEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async findAll(): Promise<IExerciseDTO[]> {
        const entities = await this.exerciseRepository.find()

        return this.buildPromise(entities)
    }

    async findUser(userId: string): Promise<IUserDTO|null> {
        const user = await this.userRepository.findOneBy({
            id: Equal(userId)
        })

        return new Promise(resolve => {
            if (user) {
                resolve(user.convertToDTO())
            }
            
            resolve(null)
        })
    }

    async findByUser(userId: string): Promise<IExerciseDTO[]> {
        const entities = await this.exerciseRepository.findBy({
            user: Equal(userId)
        })

        return this.buildPromise(entities)
    }

    async save(item: IExerciseDTO): Promise<IExerciseDTO> {
        let exerciseEntity = await this.exerciseRepository.create(item)
        exerciseEntity.user = new UserEntity()
        exerciseEntity.user.id = item.user_id
        
        let exerciseEntitySaved = await this.exerciseRepository.save(exerciseEntity)
        let userEntity = await this.userRepository.preload({id: item.user_id})

        return new Promise(resolve => {
            let exerciseDTO = exerciseEntitySaved.convertToDTO()

            if (userEntity) {
                exerciseDTO.user = userEntity.convertToDTO()
            }

            resolve(exerciseDTO)
        }) 
    }

    private buildPromise(entities: ExerciseEntity[]): Promise<IExerciseDTO[]> {
        return new Promise(resolve => {            
            let dtoList: IExerciseDTO[] = []

            for (let entity of entities) {
                dtoList.push(entity.convertToDTO())
            }

            resolve(dtoList)
        })
    }
}