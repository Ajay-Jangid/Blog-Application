import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { PostService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get()
    getAllPosts() {
        return this.postService.getAllPosts();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/user')
    getAllUserPosts(@Req() req) {
        return this.postService.getAllUserPosts(req.user.email);
    }

    @Get(':id')
    getPostById(@Param('id') id: string) {
        return this.postService.getPostById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createPost(@Body() body: { title: string; content: string }, @Req() req) {
        return this.postService.createPost(body.title, body.content, req.user.email);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updatePost(@Param('id') id: string, @Body() body: { title: string; content: string }, @Req() req) {
        return this.postService.updatePost(id, body.title, body.content, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deletePost(@Param('id') id: string, @Req() req) {
        return this.postService.deletePost(id, req.user.email);
    }
}
