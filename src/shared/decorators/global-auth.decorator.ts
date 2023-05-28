// external libraries
import { createParamDecorator, SetMetadata } from '@nestjs/common';

// constant
import { IS_PUBLIC_KEY } from '../constants/constants';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
