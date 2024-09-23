import { EnumViewNames } from 'shared-smilebaby';
import { IView } from 'shared-smilebaby';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ViewModel implements Required<IView> {
    @PrimaryGeneratedColumn()
    declare id: number;

    @Column({
        type: 'enum',
        enum: EnumViewNames,
        unique: true,
    })
    declare name: EnumViewNames;

    @Column({
        type: 'jsonb',
    })
    declare payload: object;

    @Column()
    declare description: string;
}
