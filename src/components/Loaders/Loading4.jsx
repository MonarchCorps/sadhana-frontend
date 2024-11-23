/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack'
import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress'

function FacebookCircularProgress({ size = 30, bgColor }) {
    return (
        <Box sx={{ position: 'relative' }}>
            <CircularProgress
                variant="determinate"
                sx={(theme) => ({
                    color: theme.palette.grey[200],
                    ...theme.applyStyles('dark', {
                        color: theme.palette.grey[800],
                    }),
                })}
                size={size}
                thickness={3}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={(theme) => ({
                    color: bgColor,
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                    ...theme.applyStyles('dark', {
                        color: bgColor,
                    }),
                })}
                size={size}
                thickness={3}
            />
        </Box>
    );
}

export default function Loading4({ size, bgColor = '#D6809C' }) {
    return (
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <FacebookCircularProgress size={size} bgColor={bgColor} />
        </Stack>
    );
}