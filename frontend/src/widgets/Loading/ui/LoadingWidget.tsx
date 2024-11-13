import BeatLoader from 'react-spinners/BeatLoader';

export const LoadingWidget: FC = () => {
    return (
        <div className='flex justify-center items-center'>
            <BeatLoader color={'#000'} loading={true} />
        </div>
    );
};
