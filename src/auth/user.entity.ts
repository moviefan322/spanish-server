import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Stat } from 'src/stats/stat.entity';
import { Flashcard } from 'src/flashcards/flashcard.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @OneToMany((_type) => Stat, (stat) => stat.user, { eager: true })
  stats: Stat[];

  @OneToMany((_type) => Flashcard, (flashcard) => flashcard.user, {
    eager: true,
  })
  flashcards: Flashcard[];
}
