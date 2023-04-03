import IUserDTO from './userdto.interface'

export default interface IExerciseDTO {
    id: string,
    user_id: string,
    content: string,
    created_at: Date,
    user: IUserDTO
}