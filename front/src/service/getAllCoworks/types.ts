export interface ICowork{
    id: number;
    name: string;
    price: number;
    typeOfSpace: string;
    aviability: boolean;
    dateOpen: string;
    dateClose: string;
    rate: number;
}   

export interface IFilter{
    price: number[] | null;
    typeOfSpace: string[] | null;
    aviability: boolean | null;
    rate: number | null;
}