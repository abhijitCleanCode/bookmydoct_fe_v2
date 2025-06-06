
import { Toaster } from "react-hot-toast";
import '../globals.css'
import { Suspense } from "react";
import { Header } from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import LoadingComp from "../loading";

export default function RootLayout({ children }) {
    return (

        <>
            <Header />
            <Suspense fallback={<LoadingComp />}>
                <Toaster position="top-center" reverseOrder={false} />
                {children}
            </Suspense>
            <Footer />
        </>

    );
}
