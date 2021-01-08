import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Map } from './Map';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text', nullable: true, unique: true })
	userName: string;

	@OneToOne(() => Map)
	@JoinColumn()
	map: Map;
}