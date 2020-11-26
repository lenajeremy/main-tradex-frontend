import {useSelector } from 'react-redux';
import {backendAPI} from '../fetch';

function useProfileUrl(){
  const isdevmode = useSelector(state => state.isdevmode);
  return url => isdevmode ? backendAPI + url : url;
}
export default useProfileUrl;