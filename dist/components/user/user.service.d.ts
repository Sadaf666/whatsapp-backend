import { ConfigService } from '@nestjs/config';
import { SignUpUserDto } from './dto/sigup-user.dto';
import { VerifyUserDto } from './dto/verify-otp.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UserDocument } from './schema/user.schema';
import { UserRepository } from './repository/user.repository';
import { AuthService } from '../auth/auth.service';
export declare class UserService {
    private readonly configService;
    private readonly userRepo;
    private readonly authService;
    constructor(configService: ConfigService, userRepo: UserRepository, authService: AuthService);
    signup(signupUserDto: SignUpUserDto): Promise<{
        token: string;
        users: UserDocument;
    }>;
    verify(_id: string, verifyUserDto: VerifyUserDto): Promise<{
        users: UserDocument;
    }>;
    findAll(filterUserDto: FilterUserDto): Promise<{
        users: UserDocument[];
        totalResults: number;
        pages: number;
    }>;
    findOne(_id: string): Promise<{
        users: UserDocument;
    }>;
}
