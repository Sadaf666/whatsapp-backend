// external libraries
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

// repositories
import { UserRepository } from 'src/components/user/repository/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		private readonly userRepo: UserRepository
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_SECRET_KEY')
		});
	}

	async validate(payload: any) {
		console.log(payload);

		const { _id } = payload;

		const user: any = await this.userRepo.getOne({ _id });

		return user;
	}
}
