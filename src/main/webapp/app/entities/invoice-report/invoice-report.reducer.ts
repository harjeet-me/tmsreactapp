import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IInvoiceReport, defaultValue } from 'app/shared/model/invoice-report.model';

export const ACTION_TYPES = {
  FETCH_INVOICEREPORT_LIST: 'invoiceReport/FETCH_INVOICEREPORT_LIST',
  FETCH_INVOICEREPORT: 'invoiceReport/FETCH_INVOICEREPORT',
  CREATE_INVOICEREPORT: 'invoiceReport/CREATE_INVOICEREPORT',
  UPDATE_INVOICEREPORT: 'invoiceReport/UPDATE_INVOICEREPORT',
  DELETE_INVOICEREPORT: 'invoiceReport/DELETE_INVOICEREPORT',
  SET_BLOB: 'invoiceReport/SET_BLOB',
  RESET: 'invoiceReport/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IInvoiceReport>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type InvoiceReportState = Readonly<typeof initialState>;

// Reducer

export default (state: InvoiceReportState = initialState, action): InvoiceReportState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INVOICEREPORT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INVOICEREPORT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_INVOICEREPORT):
    case REQUEST(ACTION_TYPES.UPDATE_INVOICEREPORT):
    case REQUEST(ACTION_TYPES.DELETE_INVOICEREPORT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_INVOICEREPORT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INVOICEREPORT):
    case FAILURE(ACTION_TYPES.CREATE_INVOICEREPORT):
    case FAILURE(ACTION_TYPES.UPDATE_INVOICEREPORT):
    case FAILURE(ACTION_TYPES.DELETE_INVOICEREPORT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_INVOICEREPORT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_INVOICEREPORT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_INVOICEREPORT):
    case SUCCESS(ACTION_TYPES.UPDATE_INVOICEREPORT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_INVOICEREPORT):
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

const apiUrl = 'api/invoice-reports';

// Actions

export const getEntities: ICrudGetAllAction<IInvoiceReport> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_INVOICEREPORT_LIST,
  payload: axios.get<IInvoiceReport>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IInvoiceReport> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INVOICEREPORT,
    payload: axios.get<IInvoiceReport>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IInvoiceReport> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INVOICEREPORT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IInvoiceReport> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INVOICEREPORT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IInvoiceReport> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INVOICEREPORT,
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
