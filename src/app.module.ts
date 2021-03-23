import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { jwtConstants } from './auth/auth.constants';
import { MulterModule } from '@nestjs/platform-express';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user/models/user.schema';
import { UserController } from './user/users.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { UserService } from './user/users.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1w' },
    }),
    MongooseModule.forRoot('mongodb://localhost/khakholin-alexander'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MulterModule.register(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [
    AppController,
    UserController,
  ],
  providers: [
    AppService,
    AuthService,
    JwtStrategy,
    UserService,
  ],
})
export class AppModule { }
