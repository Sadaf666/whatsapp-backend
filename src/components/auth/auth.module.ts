// external libraries
import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// controller
import { AuthController } from './auth.controller';

// service
import { AuthService } from './auth.service';

// strategy
import { JwtStrategy } from './jwt.strategy';

// module
import { UserModule } from '../user/user.module';

@Global()
@Module({
	imports: [
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET_KEY'),
				signOptions: {
					expiresIn: configService.get<string>('JWT_EXPIRATION_TIME')
				}
			}),
			inject: [ConfigService]
		}),

		UserModule
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService, JwtModule]
})
export class AuthModule {}
