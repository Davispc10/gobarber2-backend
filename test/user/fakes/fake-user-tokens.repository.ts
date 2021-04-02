import { UserToken } from 'src/user/infra/typeorm/entities/user-token.entity';
import { IUserTokensRepository } from 'src/user/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

export class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(userId: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuidv4(),
      token: uuidv4(),
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      (findToken) => findToken.token === token,
    );

    return userToken;
  }
}
