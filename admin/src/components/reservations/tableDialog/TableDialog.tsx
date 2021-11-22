import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Slide } from "@mui/material";
import React from "react";
import TableForm from "./tableForm/TableForm";
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TableDialog = ({currentTable, tableOpen, setTableOpen}: any) => {

    return (
        <Dialog
        fullWidth
        open={tableOpen}
        onClose={(e)=> {setTableOpen(false)}}
        aria-labelledby="create-table"
        TransitionComponent={Transition}
      >
        <DialogTitle id="create-table">
        <Container sx={{textAlign: "center"}}><Typography sx={{ my: 2, flex: 1 }} variant="h3">
         Создать новый стол
        </Typography>
        </Container>
        </DialogTitle>
        <DialogContent>
        <TableForm currentTable={currentTable} />
        </DialogContent>
        <DialogActions>
        <Button onClick={()=> setTableOpen(false)}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    )
}

export default TableDialog;