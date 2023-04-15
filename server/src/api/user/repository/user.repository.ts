import { CustomRepository } from 'src/common/db/decorators/CustomRepository.decorator';
import { BaseCustomRepository } from '../../../common/db/customBaseRepository/BaseCustomRepository';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user.repository.interface';

@CustomRepository(User)
export class UserRepository
  extends BaseCustomRepository<User>
  implements IUserRepository {}
