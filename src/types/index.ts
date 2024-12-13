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
  placeholder?: string
}


export type TProduct = {
  id:number
  name: string; 
  categoryId: number; 
  description: string; 
  vendorId: number; 
  images: string[];
  price: number; 
  discount: number; 
  inventorCount: number; 
};