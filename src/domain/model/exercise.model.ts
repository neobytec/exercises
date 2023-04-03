import IExerciseDTO from '../dto/exercisedto.interface'
import UserModel from './user.model'

export default class ExerciseModel {
    id: string
    content: string
    created_at: string
    user: UserModel
    
    constructor(id: string, content: string, user: UserModel) {
        this.id = id
        this.content = content
        this.user = user
    }

    static createFromDTO(exerciseDTO: IExerciseDTO): ExerciseModel {
        return new ExerciseModel(exerciseDTO.id, exerciseDTO.content, UserModel.createFromDTO(exerciseDTO.user))
    }
}