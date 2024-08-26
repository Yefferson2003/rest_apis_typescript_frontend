import { ActionFunctionArgs, Form, Link, LoaderFunctionArgs, redirect, useActionData, useLoaderData } from "react-router-dom"
import ErrorMesagge from "../components/ErrorMesagge"
import { getProductsByID, updateProduct } from "../services/ProductService"
import { Product } from "../types"
import ProductForm from "./ProductForm"

// Loader para obtener id a travez de params y el producto que queremos editar desde la URL
export async function loader({params} : LoaderFunctionArgs) {
    
    if (params.id !== undefined) {
        const product = await getProductsByID(+params.id)
        // Si no existe el porducto redireciona a la página principal por si se accede por una url
        if(!product){
            return redirect('/')
        }
        return product
    }
}

// Action del From de react.router.dom
export async function action({request, params}: ActionFunctionArgs) {
    const data= Object.fromEntries(await request.formData()) // Forma de Obtener los datos del Form
    
    // Validación
    let error=''
    if (Object.values(data).includes('')) {
        error='Todos los Campos son Obligatorios'
    }
    if (error.length) {
        return error
    }
    
    if (params.id !== undefined) {
        // Función para actualizar producto, realizando una peticion a nuestra API
        await updateProduct(data, +params.id) 
    }
    
    // Redirecionar o retornar algo en pantalla siempre en los actios
    return redirect('/')
}

const availabilityOptions = [
    { name: 'Disponible', value: true},
    { name: 'No Disponible', value: false}
]

function EditProduct() {
    
    const product = useLoaderData() as Product
    const error = useActionData() as string // conectar action con el componente 

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
                
                <Link
                    to='/'
                    className="p-3 text-sm font-bold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-600"
                >
                    Volver a Productos
                </Link>
            </div>

            {error && <ErrorMesagge>{error}</ErrorMesagge>}
            
            <Form
                method="POST"
                className="mt-10"      
            >
                <ProductForm
                    product={product}
                />

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select 
                        id="availability"
                        className="block w-full p-3 mt-2 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                        <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>
                
                <input
                    type="submit"
                    className="w-full p-2 mt-5 text-lg font-bold text-white bg-indigo-600 rounded cursor-pointer"
                    value="Guardar Producto"
                />
            </Form>
        </>
    )
}

export default EditProduct