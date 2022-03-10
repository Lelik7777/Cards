import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {Login} from '../../../n2-features/f1-auth/a1-login/Login';
import {TestPage} from '../../../n2-features/f0-test/TestPage';
import {Registration} from '../../../n2-features/f1-auth/a2-registration/Registration';
import {Profile} from '../../../n2-features/f1-auth/a3-profile/Profile';
import {CreatingNewPassword} from '../../../n2-features/f1-auth/a6-creatingNewPassword/CreatingNewPassword';
import {PageNotFound} from '../../../n2-features/f1-auth/a4-pageNotFound/PageNotFound';
import {PasswordRecoveryMI} from '../../../n2-features/f1-auth/a5-passwordRecovery/PasswordRecoveryMI';
import {CheckEmail} from '../../../n2-features/f1-auth/a5-passwordRecovery/CheckEmail';

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    PAGE_NOT_FOUND: '/pageNotFound',
    PASSWORD_RECOVERY: '/passwordRecovery',
    CREATING_NEW_PASSWORD: '/creatingNewPassword/:token',
    TEST_PAGE: '/testPage',
    CHECK_EMAIL: '/checkEmail',
}

export const RoutesComponent = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to={PATH.PROFILE}/>}/>

                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.PAGE_NOT_FOUND} element={<PageNotFound/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecoveryMI/>}/>
                <Route path={PATH.CREATING_NEW_PASSWORD} element={<CreatingNewPassword/>}/>
                <Route path={PATH.TEST_PAGE} element={<TestPage/>}/>
                <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>

                <Route path="*" element={<Navigate to={PATH.PAGE_NOT_FOUND}/>}/>
            </Routes>
        </div>
    )
}