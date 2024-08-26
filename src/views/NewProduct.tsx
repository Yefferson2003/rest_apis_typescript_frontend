import { Form, Link, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMesagge from "../components/ErrorMesagge"
import { addProduct } from "../services/ProductService"
import ProductForm from "../components/ProductForm"

// Action del From de react.router.dom
export async function action({request}: ActionFunctionArgs) {
    const data= Object.fromEntries(await request.formData()) // Forma de Obtener los datos del Form
    
    // Validación
    let error=''
    if (Object.values(data).includes('')) {
        error='Todos los Campos son Obligatorios'
    }
    if (error.length) {
        return error
    }
    
    // Función de agregar producto, realizando una peticion a nuestra API
    await addProduct(data)
    
    // Redirecionar o retornar algo en pantalla siempre en los actios
    return redirect('/')
}

function NewProduct() {
    
    const error = useActionData() as string // conectar action con el componente

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Registrar Producto</h2>
                
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
                <ProductForm/>
                
                <input
                    type="submit"
                    className="w-full p-2 mt-5 text-lg font-bold text-white bg-indigo-600 rounded cursor-pointer"
                    value="Registrar Producto"
                />
            </Form>
        </>
    )
}

export default NewProduct