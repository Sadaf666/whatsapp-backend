// external libraries
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';

// controller
import { UserController } from './user.controller';

// service
import { UserService } from './user.service';

// schema
import { User, UserSchema } from './schema/user.schema';

// repository
import { UserRepository } from './repository/user.repository';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
	],
	controllers: [UserController],
	providers: [
		UserService,
		UserRepository,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		}
	],
	exports: [UserService, UserRepository]
})
export class UserModule {}
