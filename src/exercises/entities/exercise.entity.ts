import { Routine } from 'src/routines/entities/routine.entity';
import { User } from 'src/users/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
  Entity,
} from 'typeorm';

@Entity('exercise')
export class Exercise {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  creatorId: number;

  @ManyToMany(() => User, (user) => user.exercises)
  users: User[];

  @ManyToOne(() => Routine, (routine) => routine.exercises)
  routine: Routine;
}
