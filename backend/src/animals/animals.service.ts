import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Animal, AnimalStatus } from './animal.entity';

interface FilterParams {
  species?: string;
  size?: string;
  status?: AnimalStatus;
  search?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalsRepository: Repository<Animal>,
  ) {}

  async create(data: Partial<Animal>): Promise<Animal> {
    const animal = this.animalsRepository.create(data);
    return this.animalsRepository.save(animal);
  }

  async findAll(filters: FilterParams = {}) {
    const {
      species,
      size,
      status = AnimalStatus.AVAILABLE,
      search,
      page = 1,
      limit = 12,
    } = filters;

    const where: any = {};
    if (species) where.species = species;
    if (size) where.size = size;
    if (status) where.status = status;
    if (search) {
      where.name = Like(`%${search}%`);
    }

    const [items, total] = await this.animalsRepository.findAndCount({
      where,
      take: limit,
      skip: (page - 1) * limit,
      order: { created_at: 'DESC' },
    });

    return {
      items,
      total,
      page,
      limit,
    };
  }

  findOne(id: number) {
    return this.animalsRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Animal>) {
    await this.animalsRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const animal = await this.findOne(id);
    if (!animal) return null;
    await this.animalsRepository.remove(animal);
    return { deleted: true };
  }
}