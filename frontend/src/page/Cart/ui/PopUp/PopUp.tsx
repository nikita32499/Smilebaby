interface IPropsPopUp {
    close: () => void;
}

export const PopUp: FC<IPropsPopUp> = (props) => {
    const { close } = props;

    return (
        <div className='U-center-content  fixed w-screen h-screen bg-[#0008]'>
            <div className='flex flex-col w-max bg-white shadow-boxShadowFilter p-[100px] rounded-[16px]'>
                <span className=' text-[40px]'>Спасибо за покупку ❤️</span>
                <button
                    className='bg-black text-white h-[40px] rounded-[8px] mt-[30px]'
                    onClick={close}
                >
                    Закрыть
                </button>
            </div>
        </div>
    );
};
