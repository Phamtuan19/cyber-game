/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */

interface ResponseGetList<T> {
   isSuccess: boolean;
   message: string;
   data: Array<T>;
   pagination: any;
}

interface ResponseGet<T> {
   isSuccess: boolean;
   message: string;
   data: T;
}

interface Categories {
   id: number;
   category_name: string;
   description: string;
   created_at: Date;
}

interface Product {
   id: number;
   category_id: number;
   product_name: string;
   created_at: Date;
   description: string;
   image_url: string;
   price: string;
}
