import { Inter } from "next/font/google";
import BottomNav from "@/components/BottomNav";
import HomePage from "@/components/page/HomePage";

const inter = Inter({ subsets: ["latin"] });

export default function PageHome() {
    return (
        <main className="">
            <div className="my-0 mx-auto min-h-screen max-w-480 overflow-x-hidden bg-white flex flex-col">
                {/* <Hero /> */}
                <HomePage />
                {/* <HomePage /> */}
            </div>
            <BottomNav />
        </main>
    );
}
