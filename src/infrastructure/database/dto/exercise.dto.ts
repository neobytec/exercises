import IExerciseDTO from "src/domain/dto/exercisedto.interface";
import UserDTO from "./user.dto";

export default class ExerciseDTO implements IExerciseDTO {
    id: string
    user_id: string
    content: string
    created_at: Date
    user: UserDTO
}