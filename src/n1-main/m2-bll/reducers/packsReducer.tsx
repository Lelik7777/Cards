import {packsAPI, RequestPacksType, ResponsePacksType} from '../api/api';
import {Dispatch} from 'redux';
import {setErrorN, setLoaderStatus} from './appReducer';
import {handleError} from '../../m1-ui/utilities/handleError';


const initialState = {
    data: {
        cardPacks: [
            {
                _id: 'none',
                user_id: 'none',
                name: 'no Name',
                cardsCount: 0,
                created: 'none',
                update: 'none',
            },
        ],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 0,
        pageCount: 0,
    },
    userId: '',
    cardName: '',
    minCardsValue: 0,
    maxCardsValue: 0,
}
export const packsReducer = (state = initialState, action: PacksReducerActionType): InitialStateType => {

    switch (action.type) {
        case 'PACKS_REDUCER/GET_PACKS':
            return {...state, data: action.data}
        case 'PACKS_REDUCER/SET_MAX-MIN_VALUE':
            return {...state, minCardsValue: action.min, maxCardsValue: action.max}
        case 'PACKS_REDUCER/SET_USER_ID':
            return {...state, userId: action.id}
        case 'PACKS_REDUCER/SET_CARD_NAME':
            return {...state, cardName: action.name}
        case 'PACKS_REDUCER/DELETE_PACK':
            return {...state, data: {...state.data, cardPacks: state.data.cardPacks.filter(f => f._id !== action.id)}};
        default:
            return state;
    }
}

export const getPacks = (data: ResponsePacksType) => ({type: 'PACKS_REDUCER/GET_PACKS', data} as const);

export const setMaxMinValue = (newValue: number[]) => ({
    type: 'PACKS_REDUCER/SET_MAX-MIN_VALUE',
    min: newValue[0],
    max: newValue[1]
} as const);

export const setUserID = (id: string) => ({type: 'PACKS_REDUCER/SET_USER_ID', id} as const);
export const setCardsName = (name: string) => ({type: 'PACKS_REDUCER/SET_CARD_NAME', name} as const);
export const deletePack = (id: string) => ({type: 'PACKS_REDUCER/DELETE_PACK', id} as const);

//thunks
export const getPacksCards = (data?: Partial<RequestPacksType>) =>
    async (dispatch: Dispatch<PacksReducerActionType>) => {
        try {
            dispatch(setLoaderStatus('loading'))
            const res = await packsAPI.getPacks(data);
            dispatch(getPacks(res.data))
        } catch (e) {

            handleError(e, dispatch)
        } finally {
            dispatch(setLoaderStatus('idle'))
        }
    };
export const deletePackT = (id: string) =>
    async (dispatch: Dispatch<PacksReducerActionType>) => {
        try {
            dispatch(setLoaderStatus('loading'));
            await packsAPI.deletePackCards(id);
            dispatch(deletePack(id));
        } catch (e) {

        } finally {
            dispatch(setLoaderStatus('idle'));
        }
    }
//types

export type PacksReducerActionType =
    ReturnType<typeof getPacks>
    | ReturnType<typeof setLoaderStatus>
    | ReturnType<typeof setMaxMinValue>
    | ReturnType<typeof setUserID>
    | ReturnType<typeof setCardsName>
    | ReturnType<typeof setErrorN>
    | ReturnType<typeof deletePack>
type InitialStateType = typeof initialState;