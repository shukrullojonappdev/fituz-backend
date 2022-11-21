import { Exercise } from 'src/exercises/entities/exercise.entity';
import { User } from 'src/users/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  Entity,
} from 'typeorm';

@Entity('routine')
export class Routine {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  creatorId: number;

  @ManyToMany(() => User, (user) => user.routines)
  users: User[];

  @OneToMany(() => Exercise, (exercise) => exercise.routine)
  exercises: Exercise[];
}
