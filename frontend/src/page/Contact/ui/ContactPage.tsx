import { email, phone } from 'shared/config/constants';

export const ContactPage: FC = () => {
    return (
        <div className='flex flex-col'>
            <div className='flex'>
                <p className='text-[24px] font-bold'>Почта:</p>
                <p className='text-[20px]'>{email}</p>
            </div>

            <div className='flex mt-[30px]'>
                <p className='text-[24px] font-bold'>Контакты:</p>
                <p className='text-[20px]'>+{phone}</p>
            </div>
        </div>
    );
};
