/* eslint-disable @typescript-eslint/naming-convention */
import * as yup from 'yup';

export const RoomCreateSchema = yup.object({
   room_name: yup.string().default(''),
   position: yup.string().default(''),
   image_url: yup.string().default(''),
   capacity: yup.number().min(1).default(0),
   description: yup.string().default(''),
});

export  type RoomCreateType = yup.InferType<typeof RoomCreateSchema>;
