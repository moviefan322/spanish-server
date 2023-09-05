import User from "./User";
import Flashcard from "./Flashcard";
import Stats from "./Stats";

export default interface LoginRes {
  user: User;
  access_token: string;
}
