import { Model } from 'mongoose';
import { UserDocument } from '../schema/user.schema';
export declare class UserRepository {
    private readonly Users;
    constructor(Users: Model<UserDocument>);
    projection: Record<string, unknown>;
    insertOne(object: Record<string, unknown>): Promise<UserDocument>;
    insertMany(array: Record<string, unknown>[]): Promise<any>;
    getOne(condition: Record<string, unknown>): Promise<UserDocument>;
    getAllWithPagination(condition: Record<string, unknown>, sort: string, skip: number, limit: number): Promise<UserDocument[]>;
    getAll(condition: Record<string, unknown>, sort: string): Promise<UserDocument[]>;
    update(condition: Record<string, unknown>, object: Record<string, unknown>): Promise<UserDocument>;
    remove(condition: Record<string, unknown>): Promise<any>;
    count(condition: Record<string, unknown>): Promise<number>;
    test(): Promise<void>;
}
