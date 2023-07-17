import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Stat } from 'src/stats/stat.entity';
import { Flashcard } from 'src/flashcards/flashcard.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Exclude({ toPlainOnly: true })
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
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
