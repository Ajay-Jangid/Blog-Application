import { Entity, ObjectIdColumn, Column, CreateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Post {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    authorId: string;

    @CreateDateColumn()
    createdAt: Date;
}
