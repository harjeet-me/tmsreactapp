import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAccountHistory, defaultValue } from 'app/shared/model/account-history.model';

export const ACTION_TYPES = {
  FETCH_ACCOUNTHISTORY_LIST: 'accountHistory/FETCH_ACCOUNTHISTORY_LIST',
  FETCH_ACCOUNTHISTORY: 'accountHistory/FETCH_ACCOUNTHISTORY',
  CREATE_ACCOUNTHISTORY: 'accountHistory/CREATE_ACCOUNTHISTORY',
  UPDATE_ACCOUNTHISTORY: 'accountHistory/UPDATE_ACCOUNTHISTORY',
  DELETE_ACCOUNTHISTORY: 'accountHistory/DELETE_ACCOUNTHISTORY',
  RESET: 'accountHistory/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAccountHistory>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type AccountHistoryState = Readonly<typeof initialState>;

// Reducer

export default (state: AccountHistoryState = initialState, action): AccountHistoryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ACCOUNTHISTORY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ACCOUNTHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ACCOUNTHISTORY):
    case REQUEST(ACTION_TYPES.UPDATE_ACCOUNTHISTORY):
    case REQUEST(ACTION_TYPES.DELETE_ACCOUNTHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ACCOUNTHISTORY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ACCOUNTHISTORY):
    case FAILURE(ACTION_TYPES.CREATE_ACCOUNTHISTORY):
    case FAILURE(ACTION_TYPES.UPDATE_ACCOUNTHISTORY):
    case FAILURE(ACTION_TYPES.DELETE_ACCOUNTHISTORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACCOUNTHISTORY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACCOUNTHISTORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ACCOUNTHISTORY):
    case SUCCESS(ACTION_TYPES.UPDATE_ACCOUNTHISTORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ACCOUNTHISTORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/account-histories';

// Actions

export const getEntities: ICrudGetAllAction<IAccountHistory> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ACCOUNTHISTORY_LIST,
  payload: axios.get<IAccountHistory>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IAccountHistory> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ACCOUNTHISTORY,
    payload: axios.get<IAccountHistory>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAccountHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ACCOUNTHISTORY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAccountHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ACCOUNTHISTORY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAccountHistory> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ACCOUNTHISTORY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
