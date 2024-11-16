import axios from 'axios';

type TImagePreloader = (opt: { url: string }) => void;

export const ImagePreloader: TImagePreloader = ({ url }) => {
    axios.get(url);
};
