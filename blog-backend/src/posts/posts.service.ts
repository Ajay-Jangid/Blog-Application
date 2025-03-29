import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) { }

    async getAllPosts(): Promise<Post[]> {
        return await this.postRepository.find();
    }
    async getAllUserPosts(authorId: string): Promise<Post[]> {
        return await this.postRepository.find({ where: { authorId: authorId } });
    }

    async getPostById(id: string): Promise<Post> {
        const objectId = new ObjectId(id);
        const post = await this.postRepository.findOneBy({ _id: objectId });
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        return post;
    }

    async createPost(title: string, content: string, userId: string): Promise<Post> {
        const post = this.postRepository.create({ title, content, authorId: userId });
        return await this.postRepository.save(post);
    }

    async updatePost(id: string, title: string, content: string, userId: string): Promise<Post> {
        const post = await this.getPostById(id);
        if (post.authorId !== userId) {
            throw new UnauthorizedException('You are not the author of this post');
        }

        post.title = title;
        post.content = content;
        return await this.postRepository.save(post);
    }

    async deletePost(id: string, userId: string): Promise<void> {
        const post = await this.getPostById(id);
        if (post.authorId !== userId) {
            throw new UnauthorizedException('You are not the author of this post');
        }
        await this.postRepository.delete(id);
    }
}
