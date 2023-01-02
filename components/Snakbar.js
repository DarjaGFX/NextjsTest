import { forwardRef, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snakbar({open, setOpen, message, severity="info"}) {
    // const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);

    const handleClick = () => {
        setTransition(() => TransitionRight);
        setOpen(true);
    };

    function TransitionRight(props) {
        return <Slide {...props} direction="right" />;
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpen(false);
    };
    return (
    <>
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar TransitionComponent={transition} anchorOrigin={{ 'vertical':'top', 'horizontal':'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    </>
  )
}
