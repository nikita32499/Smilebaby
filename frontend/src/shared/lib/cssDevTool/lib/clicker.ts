import Mousetrap from 'mousetrap';

type TMemoryObj = {
    lastClickElement: null | HTMLElement;
    toggle: boolean;
};

// const displayStyle = (element: HTMLElement) => {
//     const padding = element.style.padding;
//     const margin = element.style.margin;
//     const width = element.style.width;
//     const height = element.style.height;
//     const height = element.style.height;
//     const maxHeight = element.style.maxHeight;
//     const maxWidth = element.style.maxWidth;
// };

export const clicker = () => {
    const memoryObj: TMemoryObj = {
        lastClickElement: null,
        toggle: false,
    };

    const tagList = ['span', 'p', 'img', 'a', 'button'].map((tag) => tag.toUpperCase());

    const clear = () => {
        if (memoryObj.lastClickElement) {
            memoryObj.lastClickElement.style.outline = 'initial';
        }
    };

    const handler = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target && tagList.includes(target.tagName)) {
            clear();
            target.style.outline = '2px solid red';

            memoryObj.lastClickElement = target;
        }
    };

    Mousetrap.bind('ctrl+shift+f', function () {
        if (memoryObj.toggle) {
            clear();
            document.removeEventListener('click', handler);
            memoryObj.toggle = false;
        } else {
            document.addEventListener('click', handler);
            memoryObj.toggle = true;
        }
    });
};
