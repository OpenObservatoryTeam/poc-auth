import ky from 'ky';
import { API_URL } from './constant';

export default ky.create({
  credentials: 'include',
  prefixUrl: API_URL,
});