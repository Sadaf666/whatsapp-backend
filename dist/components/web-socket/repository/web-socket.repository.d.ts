import { Model } from 'mongoose';
import { SocketDocument } from '../schema/web-socket.schema';
export declare class SocketRepository {
    private readonly Sockets;
    constructor(Sockets: Model<SocketDocument>);
    projection: Record<string, unknown>;
    insertOne(object: Record<string, unknown>): Promise<SocketDocument>;
    insertMany(array: Record<string, unknown>[]): Promise<any>;
    getOne(condition: Record<string, unknown>): Promise<SocketDocument>;
    getAllWithPagination(condition: Record<string, unknown>, sort: string, skip: number, limit: number): Promise<SocketDocument[]>;
    getAll(condition: Record<string, unknown>, sort: string): Promise<SocketDocument[]>;
    update(condition: Record<string, unknown>, object: Record<string, unknown>): Promise<SocketDocument>;
    remove(condition: Record<string, unknown>): Promise<any>;
    count(condition: Record<string, unknown>): Promise<number>;
    test(): Promise<void>;
}
