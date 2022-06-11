import { useState } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Modal from 'src/components/Modal';
import CreateWorkerForm from './CreateWorkerForm';

function PageHeader() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          All Workers
        </Typography>
        <Typography variant="subtitle2">All Worker details</Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => setModalOpen(true)}
        >
          New Worker Registration
        </Button>
      </Grid>
      <Modal
        isOpen={modalOpen}
        handleClose={handleModalClose}
        content={<CreateWorkerForm onSuccess={handleModalClose} />}
        modalHeader={'Add new worker'}
        modalDescription={
          'Fill the forum and press submit button to add a new worker in the system.'
        }
      />
    </Grid>
  );
}

export default PageHeader;
