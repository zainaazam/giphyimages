import {Dispatch} from 'redux';
import {ActionTypes} from '../../constants';

export type Data = {
  type: string;
  id: string;
  url: string;
  slug: string;
  title: string;
  images: {
    original: {
      height: string;
      width: string;
      size: string;
      url: string;
      mp4_size: string;
      mp4: string;
      webp_size: string;
      webp: string;
      frames: string;
      hash: string;
    };
    fixed_height: {
      height: string;
      width: string;
      url: string;
    };
    downsized: {
      height: string;
      width: string;
      url: string;
    };
  };
  user: {
    username: string;
    display_name: string;
    description: string;
    avatar_url: string;
  };
};

export const sharedRedux = {
  setData: (data: Data[]) => (dispatch: Dispatch) => {
    dispatch({type: ActionTypes.SET_DATA, value: data});
  },
  setFavorites: (data: Data[]) => (dispatch: Dispatch) => {
    dispatch({type: ActionTypes.SET_FAVORITES, value: data});
  },
};
