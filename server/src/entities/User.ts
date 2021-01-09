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

	@Column({ type: 'text', unique: true })
	username: string;

	@Column({ type: 'text' })
	password: string;

	@Column({ type: 'text' })
	salt: string;

	@OneToOne(() => Map)
	@JoinColumn()
	map: Map;
}
