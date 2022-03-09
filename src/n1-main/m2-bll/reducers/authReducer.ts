import {authAPI, ForgotPasswordType, LoginDataType, NewPasswordType, UserType} from '../api/api';
import {Dispatch} from 'redux';
import {setLoaderStatus} from './appReducer';

const initialAuthState = {
    user: {} as UserType,
    isAuth: false,
    isRegistered: false,
    newRegisteredUser: false,
    error: false,
    errorText: '',
}

export const authReducer = (state = initialAuthState,
                            action: ActionAuthReducerType): InitialAuthStateType => {
    switch (action.type) {
        case 'AUTH_REDUCER/SET_LOGIN':
            return {...state, user: action.user, isAuth: action.isAuth};
        case 'AUTH_REDUCER/SET_LOGOUT': {
            return {...state, isAuth: false};
        }
        case 'AUTH_REDUCER/SET_ERROR': {
            return {...state, error: action.error}
        }
        case 'AUTH_REDUCER/SET_ERROR_TEXT': {
            return {...state, errorText: action.errorText}
        }
        case 'AUTH_REDUCER/SET_REGISTERED': {
            return {
                ...state,
                isRegistered: action.isRegistered,
                errorText: action.errorText,
                newRegisteredUser: action.newRegisteredUser
            };
        }
        default:
            return state;
    }
}


export const setLogin = (user: UserType, isAuth: boolean) => ({type: 'AUTH_REDUCER/SET_LOGIN', user, isAuth} as const);
export const setLogOut = () => ({type: 'AUTH_REDUCER/SET_LOGOUT'} as const);
export const setRegistered = (isRegistered: boolean, errorText: string, newRegisteredUser: boolean) => {
    return {
        type: 'AUTH_REDUCER/SET_REGISTERED',
        isRegistered,
        errorText,
        newRegisteredUser
    } as const;
}

export const setError = (error: boolean) => ({type: 'AUTH_REDUCER/SET_ERROR', error} as const);
export const setErrorText = (errorText: string) => ({type: 'AUTH_REDUCER/SET_ERROR_TEXT', errorText} as const);


export const setLoginT = (data: LoginDataType) =>
    async (dispatch: Dispatch<ActionAuthReducerType>) => {

        try {
            dispatch(setLoaderStatus('loading'))
            const res = await authAPI.login(data);
            dispatch(setLogin(res.data, true));

        } catch (er: any) {
            dispatch(setError(true))
            dispatch(setErrorText(er.response.data.error))
        } finally {
            dispatch(setLoaderStatus('idle'));
        }

    }

export const setLogoutT = () =>
    async (dispatch: Dispatch<ActionAuthReducerType>) => {

        try {
            dispatch(setLoaderStatus('loading'));
            await authAPI.logOut();
            dispatch(setLogOut());

        } catch (er: any) {
            console.log(er)
        } finally {
            dispatch(setLoaderStatus('idle'));
        }

    }

export const setRegisteredT = (data: Omit<LoginDataType, 'rememberMe'>) =>
    async (dispatch: Dispatch<ActionAuthReducerType>) => {
        try {
            dispatch(setLoaderStatus('loading'));
            dispatch(setRegistered(false, '', false))
            await authAPI.register(data);
            dispatch(setRegistered(true, '', true))
        } catch (err: any) {
            dispatch(setRegistered(false, err.response.data.error, false))
        } finally {
            dispatch(setLoaderStatus('idle'))
        }

    }

export const passwordRecoveryTC = (data: ForgotPasswordType) =>
    async (dispatch: Dispatch<ActionAuthReducerType>) => {
        try {
            dispatch(setLoaderStatus('loading'));
            await authAPI.postForgotPassword(data);

        } catch (err: any) {
            // console.log(error.error)
            dispatch(setError(true))
            dispatch(setErrorText(err.response.data.error))
        } finally {
            dispatch(setLoaderStatus('idle'))
        }

    };
export const createNewPassword = (date: NewPasswordType) =>
    async (dispatch: Dispatch<ActionAuthReducerType>) => {
        try {
            dispatch(setLoaderStatus('loading'));
            await authAPI.setNewPassword(date);

        } catch (e: any) {

        } finally {
            dispatch(setLoaderStatus('idle'));
        }
    }

export const checkAuthMeTC = (payload: {}) =>
    async (dispatch: Dispatch<ActionAuthReducerType>) => {
        try {
            dispatch(setLoaderStatus('loading'));
            const res = await authAPI.getAuthMe(payload);
            dispatch(setLogin(res.data, true));
        } catch (e: any) {

        } finally {
            dispatch(setLoaderStatus('idle'));
        }
    }

export type ActionAuthReducerType =
    ReturnType<typeof setLogin>
    | ReturnType<typeof setLogOut>
    | ReturnType<typeof setRegistered>
    | ReturnType<typeof setError>
    | ReturnType<typeof setErrorText>
    | ReturnType<typeof setLoaderStatus>


export type InitialAuthStateType = typeof initialAuthState;












