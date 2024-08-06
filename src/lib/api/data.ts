import request, {API_KEY} from '.';

interface IDataApi {
  size?: number;
  page?: number;
  query?: string;
}

export const dataApi = {
  get: ({size, page}: IDataApi) =>
    request.get(
      `/gifs/trending?api_key=${API_KEY}&limit=${size}&offset=${page}`,
    ),
  search: ({size, page, query}: IDataApi) =>
    request.get(
      `/gifs/search?api_key=${API_KEY}&q=${query}&limit=${size}&offset=${page}`,
    ),
};
