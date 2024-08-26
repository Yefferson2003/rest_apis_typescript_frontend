import { PropsWithChildren } from "react"

function ErrorMesagge({children} : PropsWithChildren) {
    return (
        <div className="p-3 my-4 font-bold text-center text-white uppercase bg-red-600">
            {children}
        </div>
    )
}

export default ErrorMesagge