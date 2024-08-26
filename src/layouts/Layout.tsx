import { Outlet } from "react-router-dom"

function Layout() {
    return (
        <>
            <header className="bg-slate-800">
                <div className="max-w-6xl py-10 mx-auto">
                    <h1 className="text-4xl font-bold text-white">
                        Administrador de Productos
                    </h1>
                </div>
            </header>

            <main className="max-w-6xl p-10 mx-auto mt-10 bg-white shadow">
                <Outlet/>
            </main>
        </>
    )
}

export default Layout