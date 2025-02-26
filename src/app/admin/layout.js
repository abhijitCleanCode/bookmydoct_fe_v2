// import Layout from '@/components/super-admin/Layout';
import { Header } from '@/components/admin/Header';
import '../globals.css';
import { Toaster } from 'react-hot-toast';


export default function AdminLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <Toaster position="top-center" reverseOrder={false} />
                <Header />
                {children}
            </body>
        </html>
    )
}

