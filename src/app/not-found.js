import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
            <Link href="/">
                <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                    Home
                </button>
            </Link>
        </div>
    );
}
