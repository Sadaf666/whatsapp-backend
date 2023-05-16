import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { UserRepository } from 'src/components/user/repository/user.repository';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly userRepo;
    constructor(configService: ConfigService, userRepo: UserRepository);
    validate(payload: any): Promise<any>;
}
export {};
