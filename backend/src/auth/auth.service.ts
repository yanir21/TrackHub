import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
      ) {}
    
      async signIn(username: string, password: string): Promise<any> {
        const user = await this.userService.getUserByUsername(username);
        const hashSalt = process.env.HASH_SALT;
        const hashedPassowrd = await bcrypt.hash(password, hashSalt);
    
        if (user?.password !== hashedPassowrd) {
          throw new UnauthorizedException();
        }
        const payload = {
          username: user.username,
          displayName: user.displayName,
          sub: user.id,
        };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
}
