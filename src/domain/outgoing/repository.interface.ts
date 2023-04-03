import IExerciseDTO from "../dto/exercisedto.interface"
import IUserDTO from "../dto/userdto.interface"

export default interface IExerciseRepository {
    findAll(): Promise<IExerciseDTO[]>
    findUser(userId: string): Promise<IUserDTO|null>
    findByUser(userId: string): Promise<IExerciseDTO[]>
    save(item: IExerciseDTO): Promise<IExerciseDTO>
}