// schema
import { UserDocument } from '../schema/user.schema';

export interface IResponse {
	token?: string;
	users: UserDocument | UserDocument[];
	totalResults?: number;
	pages?: number;
}
