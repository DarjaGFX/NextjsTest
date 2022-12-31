import { AddCircleOutline } from "@mui/icons-material";
import { Fab } from "@mui/material";


export default function FloatingButton(func) {
  const OnClickfunc = () => {
  }
  return (
    <div className="fixed bottom-14 right-14 overflow-visible z-50 duration-300 ">
        <Fab className="bg-sky-600" color="primary" aria-label="add" onClick={() => OnClickfunc()}>
            <AddCircleOutline />
        </Fab>
    </div>
  )
}
