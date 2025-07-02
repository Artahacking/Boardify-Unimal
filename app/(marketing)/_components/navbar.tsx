import Link from "next/link";
import Image from "next/image"; // Import Image component
import { Button } from "@/components/ui/button";

export const Navbar = () => {
    return (
        <>
            <div className="fixed top-0 w-full h-16 px-6 border-b shadow-sm bg-white flex items-center z-50">
                <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                    {/* Logo and Brand Name */}
                    <div className="flex items-center space-x-3">
                        {/* Custom BOARDIFY Logo */}
                        <div className="flex items-center space-x-3">
                            <Image
                                src="/unimal.png" 
                                alt="Boardify Logo"
                                width={50} 
                                height={50}
                                className="rounded-full"
                            />
                            <span className="font-bold text-xl md:text-2xl tracking-wide text-neutral-800">
                                BOARDIFY
                            </span>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="space-x-4 flex items-center">
                        <Link href="/sign-in">
                            <Button
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105"
                            >
                                 Sign-in
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105"
                            >
                               Sign-up
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            
        
        </>
    );
};