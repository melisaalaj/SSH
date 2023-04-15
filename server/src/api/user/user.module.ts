import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { CustomRepositoryModule } from 'src/common/db/CustomRepository.module';

@Module({
  imports: [CustomRepositoryModule.forCustomRepository([UserRepository])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
