import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
}
export interface ITextArea {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
  placeholder?: string;
}

export type TProduct = {
  id: number;
  name: string;
  categoryId: number;
  description: string;
  vendorId: number;
  images: string[];
  price: number;
  discount: number;
  inventorCount: number;
  createdAt: string;
  vendor?: Vendor;
};

type UserRole = "ADMIN" | "VENDOR" | "CUSTOMER";
type UserStatus = "ACTIVE" | "INACTIVE";

export interface User {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  admin?: Admin;
  vendor?: Vendor;
  customer?: Customer;
}

export interface Admin {
  name: string;
  profileImage: string;
  email: string;
  phone: string;
  address: string;
}

export interface Vendor {
  email: string;
  password: string;
  name: string;
  phone: string;
  logo: string;
  description: string;
  location: string;
  isBlacklisted: boolean;
  isDeleted: boolean;
}

export interface Customer {
  password: string;
  name: string;
  profileImage: string;
  email: string;
  phone: string;
  address: string;
}

export interface ICategory {
  id: number;
  name: string;
  image: string;
}

export type TOrderedProduct = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};



export type TOrder = {
  id: number;
  customerId: number;
  vendorId: number;
  totalQunatity: number;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  createdAt: string;
  updatedAt: string;
  products: TOrderedProduct[];
  payment: TPayment;
};


export type TVendorOrder = {
  id: number;
  orderId: number;
  transactionId: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  order: TOrder;
};




export interface TPayment {
  id: number;
  orderId: number;
  createdAt: string;
  updatedAt: string;
  order: TOrder
  transactionId: string;
  paymentStatus: string;

}


export type TReview = {
  id: number;
  description: string;
  ratings: number;
  customerId: number;
  customer: Customer;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};