import { Injectable, Inject } from "@nestjs/common";
import IExerciseDTO from "src/domain/dto/exercisedto.interface";
import { IExerciseService } from "src/domain/incoming/exerciseservice.interface";
import ExerciseDTO from "../dto/exercise.dto";
import ExerciseInputDTO from "../dto/exerciseinput.dto";

@Injectable()
export default class CreateExerciseUseCase {

    constructor(@Inject('IExerciseService') private readonly exerciseService: IExerciseService) {}

    async execute(exerciseInputDTO: ExerciseInputDTO): Promise<IExerciseDTO> {
        return this.exerciseService.create(new ExerciseDTO(exerciseInputDTO.user_id, exerciseInputDTO.content))
    }

}