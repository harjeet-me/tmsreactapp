import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFileSystem, defaultValue } from 'app/shared/model/file-system.model';

export const ACTION_TYPES = {
  FETCH_FILESYSTEM_LIST: 'fileSystem/FETCH_FILESYSTEM_LIST',
  FETCH_FILESYSTEM: 'fileSystem/FETCH_FILESYSTEM',
  CREATE_FILESYSTEM: 'fileSystem/CREATE_FILESYSTEM',
  UPDATE_FILESYSTEM: 'fileSystem/UPDATE_FILESYSTEM',
  DELETE_FILESYSTEM: 'fileSystem/DELETE_FILESYSTEM',
  SET_BLOB: 'fileSystem/SET_BLOB',
  RESET: 'fileSystem/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFileSystem>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type FileSystemState = Readonly<typeof initialState>;

// Reducer

export default (state: FileSystemState = initialState, action): FileSystemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FILESYSTEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FILESYSTEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_FILESYSTEM):
    case REQUEST(ACTION_TYPES.UPDATE_FILESYSTEM):
    case REQUEST(ACTION_TYPES.DELETE_FILESYSTEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_FILESYSTEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FILESYSTEM):
    case FAILURE(ACTION_TYPES.CREATE_FILESYSTEM):
    case FAILURE(ACTION_TYPES.UPDATE_FILESYSTEM):
    case FAILURE(ACTION_TYPES.DELETE_FILESYSTEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILESYSTEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILESYSTEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_FILESYSTEM):
    case SUCCESS(ACTION_TYPES.UPDATE_FILESYSTEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_FILESYSTEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/file-systems';

// Actions

export const getEntities: ICrudGetAllAction<IFileSystem> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_FILESYSTEM_LIST,
    payload: axios.get<IFileSystem>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IFileSystem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FILESYSTEM,
    payload: axios.get<IFileSystem>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IFileSystem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FILESYSTEM,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFileSystem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FILESYSTEM,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFileSystem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FILESYSTEM,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
