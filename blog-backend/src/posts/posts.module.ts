import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostController } from './posts.controller';
import { PostService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService, JwtAuthGuard, AuthService, JwtService],
})
export class PostsModule { }
