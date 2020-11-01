import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IInvoiceHistory, defaultValue } from 'app/shared/model/invoice-history.model';

export const ACTION_TYPES = {
  FETCH_INVOICEHISTORY_LIST: 'invoiceHistory/FETCH_INVOICEHISTORY_LIST',
  FETCH_INVOICEHISTORY: 'invoiceHistory/FETCH_INVOICEHISTORY',
  CREATE_INVOICEHISTORY: 'invoiceHistory/CREATE_INVOICEHISTORY',
  UPDATE_INVOICEHISTORY: 'invoiceHistory/UPDATE_INVOICEHISTORY',
  DELETE_INVOICEHISTORY: 'invoiceHistory/DELETE_INVOICEHISTORY',
  RESET: 'invoiceHistory/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IInvoiceHistory>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type InvoiceHistoryState = Readonly<typeof initialState>;

// Reducer

export default (state: InvoiceHistoryState = initialState, action): InvoiceHistoryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INVOICEHISTORY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INVOICEHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_INVOICEHISTORY):
    case REQUEST(ACTION_TYPES.UPDATE_INVOICEHISTORY):
    case REQUEST(ACTION_TYPES.DELETE_INVOICEHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_INVOICEHISTORY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INVOICEHISTORY):
    case FAILURE(ACTION_TYPES.CREATE_INVOICEHISTORY):
    case FAILURE(ACTION_TYPES.UPDATE_INVOICEHISTORY):
    case FAILURE(ACTION_TYPES.DELETE_INVOICEHISTORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_INVOICEHISTORY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_INVOICEHISTORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_INVOICEHISTORY):
    case SUCCESS(ACTION_TYPES.UPDATE_INVOICEHISTORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_INVOICEHISTORY):
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

const apiUrl = 'api/invoice-histories';

// Actions

export const getEntities: ICrudGetAllAction<IInvoiceHistory> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_INVOICEHISTORY_LIST,
  payload: axios.get<IInvoiceHistory>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IInvoiceHistory> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INVOICEHISTORY,
    payload: axios.get<IInvoiceHistory>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IInvoiceHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INVOICEHISTORY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IInvoiceHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INVOICEHISTORY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IInvoiceHistory> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INVOICEHISTORY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
