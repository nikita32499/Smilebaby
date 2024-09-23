import { ColumnNumberTransformer } from '_helpers/typeOrm';
import { IOrder } from 'shared-smilebaby';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderModel implements IOrder {
    //
    @PrimaryGeneratedColumn()
    declare id: number;

    @Column()
    declare name: string;

    @Column()
    declare phone: string;

    @Column({
        default: null,
        nullable: true,
    })
    declare email: string;

    @Column({
        type: 'jsonb',
    })
    declare cart: IOrder['cart'];

    @Column({
        type: 'bigint',
        default: () => Date.now().toString(),
        transformer: new ColumnNumberTransformer(),
    })
    declare createdAt: number;
}
