
import { LoaderCircle } from "lucide-react";
import Image from "next/image";

export default function LoadingComp() {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="flex flex-col items-center">

                <Image
                    src={'/loading.svg'}
                    width={400}
                    height={500}
                    alt="Loading"
                    className="h-44 w-44 md:h-80 md:w-80 animate-pulse" />

            </div>
        </div>
    )
}