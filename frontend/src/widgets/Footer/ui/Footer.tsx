import Image from 'next/image';
import { email, phone } from 'shared/config/constants';
import { CustomLink } from 'shared/ui/CustomLink';
import { IconSmileBaby } from 'shared/ui/Icons/IconSmileBaby';

export const Footer = () => {
    return (
        <footer className='flex bottom-0 bg-[#1C1C1E] w-full'>
            <div className='grid grid-cols-2 grid-rows-3-max m-auto max-w-[var(--max-site-width)] w-full pt-[30px] max-sm:grid-cols-1 max-sm:px-[17px] max-sm:justify-items-start max-sm:[&>div]:w-max max-sm:gap-[34px]'>
                <div className='flex flex-col gap-[10px] items-start max-sm:col-[1/2] '>
                    <IconSmileBaby width={150} iconColor={'#888'} />
                    <div className='flex gap-[6px]'>
                        <button>
                            <Image
                                src='/asserts/svg/footer/telegram.svg'
                                alt=''
                                width={31}
                                height={31}
                            />
                        </button>
                        <button>
                            <Image
                                src='/asserts/svg/footer/vk.svg'
                                alt=''
                                width={31}
                                height={31}
                            />
                        </button>
                        <button>
                            <Image
                                src='/asserts/svg/footer/whatsup.svg'
                                alt=''
                                width={31}
                                height={31}
                            />
                        </button>
                        <button>
                            <Image
                                src='/asserts/svg/footer/youtube.svg'
                                alt=''
                                width={31}
                                height={31}
                            />
                        </button>
                    </div>
                </div>
                <div className='flex flex-col items-end text-[#888] gap-y-[7px] max-sm:col-[1/2] max-sm:items-start'>
                    <span className='text-[24px]'>+{phone}</span>
                    <span className='text-[16px]'>Ежедневно с 09:00 до 21:00</span>
                    <span className='text-[16px]'>email: {email}</span>
                </div>
                <div className='col-span-full row-span-1 *:text-[#888] flex gap-[11px] py-[11px] border-y-[1px] border-[#3A3A3A] mt-[30px] max-sm:col-[1/2] max-sm:flex-col max-sm:!w-full'>
                    <CustomLink href={'/store'}>Витрина</CustomLink>
                    <CustomLink href={'/contact'}>Контакты</CustomLink>
                </div>
                <span className='col-span-full row-span-1 text-[#434] text-[14px] my-[30px]'>
                    Оставляя на сайте свои контактные данные, Вы даете согласие на
                    обработку своих персональных данных в соответствии с политикой
                    конфиденциальности. Сайт не является публичной офертой и носит
                    информационный характер.
                </span>
            </div>
        </footer>
    );
};
