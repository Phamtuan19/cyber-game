/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, type UseMutateFunction } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import type { RoomCreateType } from './validation';

import { getRequest, postRequest } from '~/app/configs';

export const getRom = () => {
   return useQuery<ResponseGetList<RoomItem>>({
      queryFn: () => getRequest('/room'),
   });
};

export const postRoom = () => {
   return useMutation<ResponseGetList<RoomItem>, unknown, RoomCreateType>({
      mutationFn: (data) => postRequest('/room/add', data),
      onSuccess: () => {
         // refetchCatrgory();
         toast.success('Thêm mới thành công');
         // handleClose?.();
      },
      onError: () => {
         toast.error('Có lỗi xảy ra'); // Xử lý lỗi nếu cần
      },
   });
};

export const apiUploadImageFirebase = ({
   uploadFirebaseImage,
   productId,
   createRoom,
   dataForm,
   callbackDeleteImage,
   updateProduct,
}: {
   uploadFirebaseImage: (data: React.ChangeEvent<HTMLInputElement> | null) => Promise<string | string[] | undefined>;
   productId?: number;
   createRoom: UseMutateFunction<any, unknown, any, unknown>;
   dataForm: RoomCreateType;
   callbackDeleteImage: UseMutateFunction<boolean, unknown, string | string[], unknown>;
   updateProduct?: UseMutateFunction<
      any,
      unknown,
      {
         productId: number;
         data: RoomCreateType;
      },
      unknown
   >;
}) => {
   return useMutation({
      mutationFn: async (file: React.ChangeEvent<HTMLInputElement> | null) => {
         return await uploadFirebaseImage(file);
      },
      onSuccess: (data) => {
         if (!productId) {
            return createRoom({
               ...dataForm,
               image_url: data,
            });
         }

         callbackDeleteImage(dataForm.image_url);

         return updateProduct?.({
            productId,
            data: {
               ...dataForm,
               image_url: data as string,
            },
         });
      },
      onError: (error: unknown) => {
         console.error('Image upload failed:', error);
      },
   });
};

export const apiDeleteImageFirebase = ({
   deleteFirebaseImage,
}: {
   // file: React.ChangeEvent<HTMLInputElement> | null;
   deleteFirebaseImage: (srcImage: string | string[]) => Promise<boolean>;
   // uploadFirebaseImage: (data: React.ChangeEvent<HTMLInputElement> | null) => Promise<string | string[] | undefined>;
}) => {
   return useMutation({
      mutationFn: async (srcImage: string | string[]) => {
         return await deleteFirebaseImage(srcImage);
      },
      onSuccess: async () => {
         // const image_url = await uploadFirebaseImage(file);
      },
      onError: () => {},
   });
};
