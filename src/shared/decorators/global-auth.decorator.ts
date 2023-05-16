// external libraries
import { createParamDecorator, SetMetadata } from '@nestjs/common';

// constant
import { IS_PUBLIC_KEY } from '../constants/constants';

// export const IS_PUBLIC_KEY = 'isPublic';
// export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Public = createParamDecorator(() => {
	SetMetadata(IS_PUBLIC_KEY, true);
});
