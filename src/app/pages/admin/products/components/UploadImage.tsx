/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Button, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useController, type Control, type FieldValues } from 'react-hook-form';

import noImage from '@assets/images/no-image.png';

interface UploadImagePropType<TFieldValues extends FieldValues = FieldValues> {
   control: Control<TFieldValues>;
   name: string;
   file: React.ChangeEvent<HTMLInputElement> | null;
   handleClose: () => void;
   setFile: React.Dispatch<React.SetStateAction<React.ChangeEvent<HTMLInputElement> | null>>;
}

const UploadImage = (props: UploadImagePropType) => {
   const { control, name, file, setFile } = props;

   const [imageUrl, setImageUrl] = useState<string | null>(noImage);

   const {
      field: { value: imageOrImages },
      fieldState: { error },
   } = useController({ name, control });

   const handleChangeInputFile = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFile(event);
   };

   useEffect(() => {
      if (file) {
         const fileImage = file?.target.files;

         if (fileImage && fileImage.length > 0) {
            const newFile = fileImage[0];
            const reader = new FileReader();

            reader.onload = () => {
               setImageUrl(reader.result as string); // Store the base64 string when file is read
            };

            reader.readAsDataURL(newFile);

            return () => {
               // Clean up any object URL if created
               URL.revokeObjectURL(imageUrl || '');
            };
         }

         return setImageUrl(noImage);
      } else {
         setImageUrl(imageOrImages.length > 0 ? imageOrImages : noImage); // Set to fallback image
      }
   }, [file, imageOrImages]);

   return (
      <Box>
         <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Button
               component="label"
               htmlFor="upload-image"
               variant="contained"
               tabIndex={-1}
               sx={{
                  position: 'relative',
                  zIndex: 2,
                  cursor: 'pointer',
                  width: 150,
                  height: 150,
                  background: 'center center/cover no-repeat',
                  backgroundImage: `url('${imageUrl}')`,
               }}
            >
               <VisuallyHiddenInput id="upload-image" type="file" onChange={handleChangeInputFile} />
            </Button>
         </Box>

         <Box sx={{ fontSize: '0.75rem', color: '#d32f2f' }}>{error?.message}</Box>
      </Box>
   );
};

const VisuallyHiddenInput = styled('input')({
   clip: 'rect(0 0 0 0)',
   clipPath: 'inset(50%)',
   height: 1,
   overflow: 'hidden',
   position: 'absolute',
   bottom: 0,
   left: 0,
   whiteSpace: 'nowrap',
   width: 1,
});

export default UploadImage;
