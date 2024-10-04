import * as yup from 'yup';

export const SignInSchema = yup.object({
   username: yup.string().required('Tài khoản không được để trống').max(100, '').default('tuanpa'),
   password: yup.string().required('Mật khẩu không được để trống').max(100, '').default('admin123456'),
});

export type SignInPropType = yup.InferType<typeof SignInSchema>;
