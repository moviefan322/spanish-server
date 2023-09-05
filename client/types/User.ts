import Stats from "./Stats";
import Flashcard from "./Flashcard";

export default interface User {
  username: string;
  email: string;
  stats: Stats[];
  flashcards: Flashcard[];
}
