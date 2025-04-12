import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

export default function DashboardPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <Logo />
            <h1 className="text-4xl font-bold text-white mb-8">Dashboard PDV</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
                <Link
                    to="/caixa"
                    className="flex items-center justify-center border rounded-lg p-6 shadow hover:shadow-lg hover:color-black hover:border-black transition"
                >
                    <span className="text-xl font-semibold text-white">Caixa</span>
                </Link>
                <Link
                    to="/produtos"
                    className="flex items-center justify-center hover:text-black hover:border-black border rounded-lg p-6 shadow hover:shadow-lg transition"
                >
                    <span className="text-xl font-semibold text-white">Produtos</span>
                </Link>
                <Link
                    to="/relatorios"
                    className="flex items-center justify-center hover:text-black hover:border-black border rounded-lg p-6 shadow hover:shadow-lg transition"
                >
                    <span className="text-xl font-semibold text-white">Relatórios</span>
                </Link>
                <Link
                    to="/configuracoes"
                    className="flex items-center justify-center hover:text-black hover:border-black border rounded-lg p-6 shadow hover:shadow-lg transition"
                >
                    <span className="text-xl font-semibold text-white">Configurações</span>
                </Link>
            </div>
        </div>
    );
}
