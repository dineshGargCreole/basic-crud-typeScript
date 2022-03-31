import { UploadFile } from 'antd/lib/upload/interface'


type rating = {
  rate: number;
  count: number;
}

export interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    rating: rating;
    image: string;
  }

