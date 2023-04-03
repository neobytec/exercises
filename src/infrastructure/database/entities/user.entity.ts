import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import UserDTO from '../dto/user.dto'
import ExerciseEntity from './exercise.entity'

@Entity({name: 'user'})
export default class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @OneToMany(() => ExerciseEntity, (exercise: ExerciseEntity) => exercise.user)
    exercises: ExerciseEntity[]

    convertToDTO(): UserDTO {
        let userDTO = new UserDTO()
        userDTO.name = this.name
        return userDTO
    }
}