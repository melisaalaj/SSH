import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { MailerService } from '../mailer/mailer.service';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ForgetPasswordDto } from '../user/dtos/forget-password.dto';
import { ResetPasswordDto } from '../user/dtos/reset-password.dto';
import { LoginDto } from '../user/dtos/login-user.dto';

@Controller('auth')
@ApiBearerAuth()
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailerService: MailerService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.signUp(createUserDto);
    return user;
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgetPasswordDto) {
    const user = await this.authService.getUserByEmail(body.email);

    if (!user) {
      return { status: 404, content: { msg: 'User not found' } };
    }

    const token = await this.authService.generateResetPasswordToken(user);
    console.log(token);

    await this.mailerService.sendResetPasswordEmail(user.email, token);

    return { status: 200, content: { msg: 'Reset password email sent' } };
  }

  @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() body: ResetPasswordDto,
  ) {
    const resetPasswordResult = await this.authService.resetPassword(
      token,
      body.password,
    );
    return {
      status: resetPasswordResult.status,
      content: resetPasswordResult.msg,
    };
  }
}
