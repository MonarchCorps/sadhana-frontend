/* eslint-disable react/prop-types */
import { Fab } from '@mui/material'
import { ArrowDownward, SmartToy } from '@mui/icons-material'

export default function BotButton({ handleOpen, open }) {
    return (
        <Fab sx={{ background: '#D6809C', color: '#fff', '&:hover': { color: '#D6809C' } }} onClick={handleOpen}>
            {
                open ? <SmartToy /> : <ArrowDownward />
            }
        </Fab>
    );
}