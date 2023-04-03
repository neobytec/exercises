import { Injectable, Inject } from '@nestjs/common';
import IExerciseDTO from '../dto/exercisedto.interface';
import NotFoundError from '../error/notfound.error';
import ValidationError from '../error/validation.error';
import { IExerciseService } from '../incoming/exerciseservice.interface';
import IExerciseRepository from '../outgoing/repository.interface';

@Injectable()
export class ExerciseService implements IExerciseService {
    constructor(@Inject('IExerciseRepository') private readonly exerciseRepository: IExerciseRepository) {}

    async getAll(): Promise<IExerciseDTO[]> {
        return this.exerciseRepository.findAll()
    }

    async create(item: IExerciseDTO): Promise<IExerciseDTO> {

        if (item.content.length >= 100) {
            throw new ValidationError('Exercise content can not be longer than 100 characteres')
        }

        const user = await this.exerciseRepository.findUser(item.user_id)

        if (!user) {
            throw new NotFoundError('User does not exist: ' + item.user_id)
        }

        const exercisesByUser = await this.exerciseRepository.findByUser(item.user_id)

        if (exercisesByUser.length >= 10) {
            throw new ValidationError('Exercise not created, 10 exercises for user: ' + item.user_id)
        }

        return this.exerciseRepository.save(item)
    }

}