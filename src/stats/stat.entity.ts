import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

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
  @Exclude({ toPlainOnly: true })
  user: User;
}
