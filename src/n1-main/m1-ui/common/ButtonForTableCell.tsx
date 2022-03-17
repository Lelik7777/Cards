import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import React from 'react';
import {getCardsTC} from "../../m2-bll/reducers/cardReducer";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";

type PropsType = {
    text: string
    idPack: string
}
export const ButtonForTableCell = ({text, idPack}: PropsType) => {
    const dispatch = useDispatch()

    const showCards = () => {
        console.log(idPack)
        dispatch(getCardsTC(1, 7, idPack))
    }
    return (
        <>
            <span>{text} </span>
            <NavLink to={'/cards'}>
            <Button variant="text" onClick={showCards} size={'small'} style={{marginLeft:'5px'}}>
                Cards
                <ExitToAppIcon/>
            </Button>
            </NavLink>
        </>
    )
}