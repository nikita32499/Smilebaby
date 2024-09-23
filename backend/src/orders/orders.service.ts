import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUpdateSuccess } from '_helpers/typeOrm';
import { IOrderCreate, IOrderUpdate } from 'shared-smilebaby';
import { Repository } from 'typeorm';
import { OrderModel } from './order.model';
import { IOrderRepository } from './types/OrderRepository.types';

@Injectable()
export class OrdersService implements IOrderRepository {
    constructor(
        @InjectRepository(OrderModel)
        private readonly Order: Repository<OrderModel>,
    ) {}

    async create(createData: IOrderCreate) {
        const newOrder = await this.Order.create({
            ...createData.createData,
            email: createData.createData.email ?? undefined,
        });
        const result = await this.Order.save(newOrder);
        return result;
    }

    async getAll() {
        return (await this.Order.find()).sort((a, b) => a.id - b.id);
    }

    async getById(id: number) {
        return await this.Order.findOne({ where: { id } });
    }

    async update(updateOrder: IOrderUpdate) {
        const result = await this.Order.update(updateOrder.id, {
            ...updateOrder.update,
            email: updateOrder.update.email ?? undefined,
        });
        return isUpdateSuccess(result);
    }

    async delete(id: number) {
        const result = await this.Order.delete(id);
        return isUpdateSuccess(result);
    }
}

type ff = Pretty<IOrderUpdate['update']>;
