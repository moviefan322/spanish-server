import { Controller, Body, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthSignInDto } from './dto/auth-signIn.dto';
import { User } from './user.entity';
import { GetUser } from './get-user-decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  singUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  singIn(
    @Body() authSignInDto: AuthSignInDto,
  ): Promise<{ user: User; access_token: string }> {
    return this.authService.signIn(authSignInDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  async getMe(@GetUser() user: User): Promise<User> {
    return user;
  }
}
