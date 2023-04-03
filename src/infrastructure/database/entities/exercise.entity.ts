import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import ExerciseDTO from '../dto/exercise.dto';
import UserEntity from "./user.entity";

@Entity({name: 'exercise'})
export default class ExerciseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @ManyToOne(() => UserEntity, (user: UserEntity) => user.exercises, { eager: true })
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: UserEntity

    @Column()
    content: string
    
    @Column()
    created_at: Date

    convertToDTO(): ExerciseDTO {
        let exerciseDTO: ExerciseDTO = new ExerciseDTO()
        exerciseDTO.id = this.id
        exerciseDTO.user_id = this.user.id
        exerciseDTO.content = this.content
        exerciseDTO.created_at = this.created_at
        exerciseDTO.user = this.user.convertToDTO()

        return exerciseDTO;
    }
}