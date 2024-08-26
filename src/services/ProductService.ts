import axios from "axios";
import { safeParse, } from "valibot";
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types";
import { toBoolean } from "../utils";

type ProductData ={
    [k: string]: FormDataEntryValue;
}
// Funcion para crear producto
export async function addProduct(data : ProductData) {
    try {
        // Validación por medio de valibot
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price //Convertimos de string que es lo recibimos a number
        })

        if (result.success) {
            // Peticion a nuestra API con axios y el metodo POST
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error("Datos no Validos");
        }

    } catch (error) {
        console.log(error);
        
    }
}
// Función de obtener los productos
export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const {data} = await axios(url)
        // Validación con valibot
        const result = safeParse(ProductsSchema, data.data)
        if (result.success) {
            return result.output
        }else{
            throw new Error("Hubo un Error");
            
        }
    } catch (error) {
        console.log(error);
        
    }
}
// Función de obtener un producto por su ID
export async function getProductsByID(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios(url)
        // Validación con valibot
        const result = safeParse(ProductSchema, data.data)
        if (result.success) {
            return result.output
        }else{
            throw new Error("Hubo un Error");
            
        }
    } catch (error) {
        console.log(error);
        
    }
}
// Función para editar un producto por su id
export async function updateProduct(data : ProductData, id : Product['id']) {
    try {
        // Validación
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: +data.price,
            availability: toBoolean(data.availability.toString())
        })

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        }
    } catch (error) {
        
    }
    
}
// Funcióm para eliminar un producto por su id
export async function deleteProdut(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error);
        
    }
}

export async function updateProductAvailability(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error);
        
    }
}