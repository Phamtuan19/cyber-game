/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useState, type Dispatch, type SetStateAction } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import UploadImage from '../products/components/UploadImage';

import { RoomCreateSchema, type RoomCreateType } from './validation';
import { apiDeleteImageFirebase, apiUploadImageFirebase, postRoom } from './service';

import { ControllerLabel, ControllerTextarea, ControllerTextField } from '@components/formController';
import useFirebaseUpload from '@hooks/useFirebaseUpload';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   minWidth: 600,
   bgcolor: 'background.paper',
   borderRadius: '10px',
   boxShadow: 24,
   padding: 2,
};

interface FormAddRomPropType {
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
}

const FormAddRoom = (props: FormAddRomPropType) => {
   const { open, setOpen } = props;

   const { control, reset, handleSubmit, getValues } = useForm<RoomCreateType>({
      resolver: yupResolver(RoomCreateSchema),
      defaultValues: RoomCreateSchema.getDefault(),
   });

   const [file, setFile] = useState<React.ChangeEvent<HTMLInputElement> | null>(null);

   const handleClose = () => {
      reset();
      setOpen(false);
   };

   const { uploadFirebaseImage, deleteFirebaseImage } = useFirebaseUpload();

   const { mutate } = postRoom();
   const { mutate: callbackDeleteImage } = apiDeleteImageFirebase({ deleteFirebaseImage });
   const { mutate: callbackUploadImage, isLoading: uploadLoading } = apiUploadImageFirebase({
      uploadFirebaseImage,
      dataForm: getValues(),
      callbackDeleteImage,
      createRoom: mutate,
   });

   const onSubmitForm: SubmitHandler<RoomCreateType> = () => callbackUploadImage(file);

   return (
      <React.Fragment>
         <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  Thêm mới phòng
               </Typography>
               <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmitForm)}
                  display="flex"
                  flexDirection="column"
                  gap="12px"
                  mt={2}
               >
                  <Box display="flex" gap={2}>
                     <Box flex={1}>
                        <ControllerLabel title="Tên phòng" required />
                        <ControllerTextField name="room_name" control={control} placeholder="Nhập tên phòng" />
                     </Box>
                  </Box>
                  <Box display="flex" gap={2}>
                     <Box flex={1}>
                        <ControllerLabel title="Số lượng máy" required />
                        <ControllerTextField name="capacity" control={control as never} placeholder="Nhập số lượng" />
                     </Box>
                     <Box flex={1}>
                        <ControllerLabel title="Vị trí" required />
                        <ControllerTextField
                           name="position"
                           control={control as never}
                           placeholder="Nhập vị trí phòng"
                        />
                     </Box>
                  </Box>
                  <Box>
                     <ControllerLabel title="Mô tả" />
                     <ControllerTextarea
                        name="description"
                        control={control as never}
                        placeholder="Nhập mô tả ngắn sản phẩm"
                     />
                  </Box>
                  <UploadImage
                     name="image_url"
                     control={control as never}
                     handleClose={handleClose}
                     file={file}
                     setFile={setFile}
                  />
                  <Box display="flex" alignItems="center" justifyContent="end" gap={2} mt={2}>
                     <Button type="button" color="error" variant="outlined" onClick={handleClose}>
                        Hủy
                     </Button>
                     <LoadingButton type="submit" variant="outlined" loading={false}>
                        Thêm mới
                     </LoadingButton>
                  </Box>
               </Box>
            </Box>
         </Modal>
      </React.Fragment>
   );
};

export default FormAddRoom;
