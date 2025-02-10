import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import ItemForm from "./ItemForm";
import { Item } from "../types/item";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface FormModalProps {
  editingItem?: Item | null; // Allow item to be null or undefined
  handleItemCreated: () => void; // Callback to refresh the list after action
  handleCloseModal: () => void;
  modalIsOpen: boolean;
}

export default function FormModal({
  editingItem,
  handleItemCreated,
  handleCloseModal,
  modalIsOpen,
}: FormModalProps) {
  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={modalIsOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalIsOpen}>
          <Box sx={style}>
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              Create/Edit Item
            </Typography>
            <ItemForm item={editingItem} onItemCreated={handleItemCreated} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
