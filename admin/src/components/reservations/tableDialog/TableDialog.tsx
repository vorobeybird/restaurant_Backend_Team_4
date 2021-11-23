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

const TableDialog = ({currentTable, setCurrentTable, tableOpen, handleCloseTable, fetchReservationData}: any) => {

    return (
        <Dialog
        fullWidth
        open={tableOpen}
        onClose={handleCloseTable}
        aria-labelledby="create-table"
        TransitionComponent={Transition}
      >
        <DialogTitle id="create-table">
        <Container sx={{textAlign: "center"}}><Typography sx={{ my: 2, flex: 1 }} variant="h3">
         {currentTable.id ? `Редактировать стол № ${currentTable.table_number}` : "Создать новый стол"}
        </Typography>
        </Container>
        </DialogTitle>
        <DialogContent>
      <TableForm currentTable={currentTable} setCurrentTable={setCurrentTable} handleCloseTable={handleCloseTable} fetchReservationData={fetchReservationData}/>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleCloseTable}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    )
}

export default TableDialog;