import { type } from 'os';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Map extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('text', { array: true })
	visitedCountries: string[];
}
