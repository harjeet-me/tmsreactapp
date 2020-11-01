import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICompanyProfile, defaultValue } from 'app/shared/model/company-profile.model';

export const ACTION_TYPES = {
  FETCH_COMPANYPROFILE_LIST: 'companyProfile/FETCH_COMPANYPROFILE_LIST',
  FETCH_COMPANYPROFILE: 'companyProfile/FETCH_COMPANYPROFILE',
  CREATE_COMPANYPROFILE: 'companyProfile/CREATE_COMPANYPROFILE',
  UPDATE_COMPANYPROFILE: 'companyProfile/UPDATE_COMPANYPROFILE',
  DELETE_COMPANYPROFILE: 'companyProfile/DELETE_COMPANYPROFILE',
  SET_BLOB: 'companyProfile/SET_BLOB',
  RESET: 'companyProfile/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICompanyProfile>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type CompanyProfileState = Readonly<typeof initialState>;

// Reducer

export default (state: CompanyProfileState = initialState, action): CompanyProfileState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMPANYPROFILE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMPANYPROFILE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_COMPANYPROFILE):
    case REQUEST(ACTION_TYPES.UPDATE_COMPANYPROFILE):
    case REQUEST(ACTION_TYPES.DELETE_COMPANYPROFILE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_COMPANYPROFILE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMPANYPROFILE):
    case FAILURE(ACTION_TYPES.CREATE_COMPANYPROFILE):
    case FAILURE(ACTION_TYPES.UPDATE_COMPANYPROFILE):
    case FAILURE(ACTION_TYPES.DELETE_COMPANYPROFILE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPANYPROFILE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPANYPROFILE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMPANYPROFILE):
    case SUCCESS(ACTION_TYPES.UPDATE_COMPANYPROFILE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMPANYPROFILE):
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

const apiUrl = 'api/company-profiles';

// Actions

export const getEntities: ICrudGetAllAction<ICompanyProfile> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COMPANYPROFILE_LIST,
  payload: axios.get<ICompanyProfile>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ICompanyProfile> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMPANYPROFILE,
    payload: axios.get<ICompanyProfile>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICompanyProfile> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMPANYPROFILE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICompanyProfile> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMPANYPROFILE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICompanyProfile> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMPANYPROFILE,
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
