import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProdut } from "../services/ProductService"

type ProductDetailsProps = {
    product: Product
}

// Action para eliminar
export async function action({params}: ActionFunctionArgs){
    if (params.id !== undefined) {
        await deleteProdut(+params.id)
        return redirect('/')
    }
}

function ProductDetails({product} : ProductDetailsProps) {

    const isAvailable = product.availability

    const navigate = useNavigate() // Segunda forma de navegación aparte de Link
    const fetcher = useFetcher() // Poder usar Actions en la  misma pagina, sin redireción 
    
    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form 
                    method='POST'
                >
                    {/* Se envia solo id ya que es lo unico que la API necesita */}
                    <button
                        type="submit"
                        name="id" // name es lo que envia fetcher
                        value={product.id} // value tambien lo envia fetcher
                        className={`${isAvailable ? 'text-black' : 'text-red-600'} rounde-lg p-2 text-xs uppercase font-bold w-full border border-b-slate-100 hover:cursor-pointer`}
                    >
                        {isAvailable ? 'Disponible' : 'No Disponible'}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate(`productos/${product.id}/editar`)} // redirecionar
                        className="w-full p-2 text-xs font-bold text-center text-white uppercase bg-indigo-500 rounded-lg"
                    >
                        Editar
                    </button>
                    <Form 
                        className="w-full"
                        method="POST"
                        action={`/productos/${product.id}/eliminar`}
                        onSubmit={(e) => {
                            if (!confirm('Eliminar?')) {
                                e.preventDefault()
                            }
                        }} //Forma basica de confirmación de un acción
                    >
                        <input 
                            type="submit" 
                            value="Eliminar"
                            className="w-full p-2 text-xs font-bold text-center text-white uppercase bg-red-500 rounded-lg"
                        />
                    </Form>
                </div>
            </td>
        </tr> 
    )
}

export default ProductDetails