import { IItem } from 'shared-smilebaby/dist/types/item.types';

interface IPropsPagesItemPanel {
    items: IItem[];
}

const rows = 3;

export const PagesItemPanel: FC<IPropsPagesItemPanel> = (props) => {
    const { items } = props;
    return <div>
			
		</div>;
};