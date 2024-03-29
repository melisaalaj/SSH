import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { LoginDto } from '../user/dtos/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
  
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const payload = { email: user.email, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
  
    return {
      access_token: accessToken,
      user: user, // Include the user data in the response
    };
  }
  
  async getUserByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async signUp(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createdUser = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });

    return createdUser;
  }

  async generateResetPasswordToken(user: User): Promise<string> {
    const payload = { email: user.email };
    return jwt.sign(payload, 'secret', { expiresIn: '15m' });
  }

  async resetPassword(
    token: string,
    password: string,
  ): Promise<Record<string, any>> {
    let decoded: any;
    try {
      decoded = jwt.verify(token, 'secret');
    } catch (err) {
      return { status: 400, msg: { msg: 'Invalid token' } };
    }

    const user = await this.usersRepository.findOne({
      where: { email: decoded.email },
    });

    if (!user) {
      return { status: 404, msg: { msg: 'User not found' } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await this.usersRepository.save(user);

    return { status: 200, msg: { msg: 'Password reset successfully' } };
  }
}
