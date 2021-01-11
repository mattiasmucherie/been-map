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

	@Column({ type: 'text', select: false })
	password: string;

	@Column({ type: 'text', select: false })
	salt: string;

	@OneToOne(() => Map)
	@JoinColumn()
	map: Map;
}
