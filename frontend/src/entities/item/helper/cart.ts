import { IItem } from 'shared-smilebaby';
import { IPurchase } from '../store/items.slice';

export const findPurchase = (
    cartList: IPurchase[],
    itemId: IItem['id'],
    size: string,
) => {
    return cartList.find((cardEl) => cardEl.item.id === itemId && cardEl.size === size);
};

export const getFinallyCount = (cart: IPurchase[]) => {
    return cart.reduce<number>((acc, purchase) => {
        return purchase.avail ? acc + purchase.quantity : acc;
    }, 0);
};

export const getFinallyPrice = (cart: IPurchase[]) => {
    return cart.reduce<number>((acc, purchase) => {
        return purchase.avail ? acc + purchase.item.price * purchase.quantity : acc;
    }, 0);
};
