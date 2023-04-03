import IExerciseDTO from "../dto/exercisedto.interface"

export interface IExerciseService {
    getAll(): Promise<IExerciseDTO[]>
    create(item: IExerciseDTO): Promise<IExerciseDTO>
}