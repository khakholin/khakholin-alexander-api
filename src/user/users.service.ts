import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserRegistrationDto } from './users.types';

export type User = any;

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async registrationUser(data: UserRegistrationDto): Promise<any> {
        if (data.password && data.username) {
            if (await this.userModel.findOne({ username: data.username })) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    message: 'USERNAME_DUPLICATE',
                }, HttpStatus.NOT_FOUND);
            } else {
                const newUser = new this.userModel(data);
                newUser.username = data.username;
                newUser.save();
                throw new HttpException({
                    status: HttpStatus.CREATED,
                    message: 'SUCCESS',
                }, HttpStatus.CREATED);
            }
        } else {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: 'INVALID_DATA',
            }, HttpStatus.FORBIDDEN);
        }
    }
}
