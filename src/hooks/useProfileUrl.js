import {useSelector} from 'react-redux';
import {backendAPI } from '../fetch';

export default function useUrl(){
  const isdevmode = useSelector(state => state.isdevmode);
  return url => isdevmode ? backendAPI + url : url;
}