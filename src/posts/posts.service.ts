import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {

  constructor(@InjectRepository(Post) private repository: Repository<Post>) {}

  async create(createPostDto: CreatePostDto) {
    const post = await this.repository.create(createPostDto)
    await this.repository.save(post)
    return post
  }

  findAll() {
    return this.repository.find()
  }

  async findOne(id: number) {
    console.log(id)
    const post = await this.repository.findOneBy({id: id})
    if (post) {
      return post
    }
    throw new NotFoundException();
    
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.repository.update(id, updatePostDto)
    const post = await this.repository.findOneBy({id: id})
    if (post) {
      return post
    }
    throw new NotFoundException();
  }

  async remove(id: number) {
    const post = await this.repository.delete(id)
    if (!post.affected) {
      throw new NotFoundException();
    }
  }
}
