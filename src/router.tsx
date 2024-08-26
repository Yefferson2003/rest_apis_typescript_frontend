import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Product, {loader as productsLoader, action as updateAvailabilityAction} from "./views/Products";
import NewProduct, {action as newProductAction} from "./views/NewProduct";
import EditProduct, {loader as editProductLoader, action as editProductAction} from "./components/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Product/>,
                loader: productsLoader, // Conectar la página y el loader
                action: updateAvailabilityAction
            },
            {
                path: '/productos/nuevo',
                element: <NewProduct/>,
                action: newProductAction // Conectar la página y el action
            },
            {
                path: '/productos/:id/editar',
                element: <EditProduct/>,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: '/productos/:id/eliminar',
                action: deleteProductAction
            }
        ]
    }
])