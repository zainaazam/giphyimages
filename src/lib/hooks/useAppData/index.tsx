import {useSelector} from 'react-redux';
import _ from 'lodash';
import {Dispatch} from 'redux';
import {dataApi} from '../../api/data';
import {sharedRedux} from '../../redux/actions/shared';

export const useAppData = () => {
  const {data} = useSelector((state: {Shared: any}) => state.Shared);

  return {
    data,
  };
};

export const GLOBAL_DATA_SERVICE = {
  getHomeData: (size: number = 20, page: number = 1, dispatch: Dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        let {data} = (await dataApi.get({
          size: size,
          page: page,
        })) as any;
        sharedRedux.setData(data)(dispatch);
        resolve({data});
      } catch (e) {
        reject(e);
      }
    });
  },
};
