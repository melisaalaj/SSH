import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { CustomRepositoryModule } from 'src/common/db/CustomRepository.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordReset } from './entities/reset-password.entity';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([UserRepository]),
    TypeOrmModule.forFeature([PasswordReset]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
