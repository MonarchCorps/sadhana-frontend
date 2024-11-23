/* eslint-disable react/prop-types */
import { Fab } from '@mui/material'
import { SmartToy } from '@mui/icons-material'

export default function BotButton({ handleOpen }) {
    return (
        <Fab sx={{ background: '#D6809C', color: '#fff', '&:hover': { color: '#D6809C' } }} onClick={handleOpen}>
            <SmartToy />
        </Fab>
    );
}