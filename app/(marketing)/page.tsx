import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Medal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const headingFont = localFont({
    src: "../../public/fonts/font.woff2",
});

const textFont = Poppins({
    subsets: ["latin"],
    weight: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
    ],
});

const MarketingPage = () => {
    return (
        <div className="flex items-center justify-center flex-col min-h-screen bg-blue-50 p-6">
            {/* Header Section */}
            <div className={cn(
                "flex items-center justify-center flex-col",
                headingFont.className
            )}>
                <div className="mb-4 flex items-center border shadow-lg p-4 bg-green-100 text-green-700 rounded-full uppercase animate-bounce">
                    <Medal className="h-6 w-6 mr-2" />
                    🚀 Kolaborasi Cerdas untuk Tugas Akhirmu! 🎓
                </div>
                <h1 className="text-4xl md:text-6xl text-center text-neutral-800 font-bold mb-6">
                    Boardify Unimal 
                </h1> 
                <div className="text-3xl md:text-5xl bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                    Solusi Bimbingan Tugas Akhir Anda
                </div>
            </div>

            {/* Subtitle Section */}
            <div className={cn(
                "text-sm md:text-xl text-neutral-600 mt-6 max-w-xs md:max-w-2xl text-center mx-auto leading-relaxed",
                textFont.className
            )}>
                Boardify hadir sebagai solusi terbaik bagi mahasiswa Teknik Informatika dalam menyelesaikan tugas akhir atau skripsi dengan lebih mudah dan terstruktur. Dengan fitur diskusi interaktif, manajemen tugas yang efisien, dan akses cepat ke sumber daya penting, Boardify memastikan komunikasi yang lancar antara mahasiswa dan dosen pembimbing.
            </div>

            {/* Feature Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-bold text-lg text-green-700">📌 Diskusi Terstruktur</h3>
                    <p className="text-sm text-neutral-600 mt-2">Pantau progres bimbingan dengan lebih jelas.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-bold text-lg text-green-700">📌 Manajemen Tugas Efektif</h3>
                    <p className="text-sm text-neutral-600 mt-2">Atur deadline dan tugas dengan mudah.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-bold text-lg text-green-700">📌 Notifikasi Otomatis</h3>
                    <p className="text-sm text-neutral-600 mt-2">Jangan khawatir terlewat bimbingan!</p>
                </div>
            </div>

            {/* Call to Action */}
            <Button
                className="mt-8 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-lg px-8 py-3 rounded-full text-lg font-medium transform hover:scale-110 transition-transform duration-300"
                size="lg"
                asChild
            >
                <Link href="/sign-up">
                    Gabung Sekarang di Boardify 🚀
                </Link>
            </Button>
        </div>
    );
};

export default MarketingPage;

      
