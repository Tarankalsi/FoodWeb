import {atom } from "recoil"

export const selectedCategoriesAtom = atom<string[]>({
    key: "selectedCategoriesAtom",
    default: []
})

export const sortOrderAtom = atom({
    key: "sortOrderAtom",
    default: ""
})

export const productsAtom = atom<any[]>({
    key:"productsAtom",
    default:[]
})