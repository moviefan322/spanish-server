import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Entity()
export class Stat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lessonId: number;

  @Column()
  score: number;

  @Column()
  outOf: number;

  @ManyToOne((_type) => User, (user) => user.stats, { eager: false })
  user: User;
}
