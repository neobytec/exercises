import { Injectable, Inject } from "@nestjs/common";
import IExerciseDTO from "src/domain/dto/exercisedto.interface";
import { IExerciseService } from "src/domain/incoming/exerciseservice.interface";
import { ExerciseService } from "src/domain/service/exercise.service";
import ExerciseDTO from "../dto/exercise.dto";

@Injectable()
export default class GetAllExercisesUseCase {

    constructor(@Inject('IExerciseService') private readonly exerciseService: IExerciseService) {}

    async execute(): Promise<IExerciseDTO[]> {
        return this.exerciseService.getAll()
    }

}