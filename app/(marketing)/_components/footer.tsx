export const Footer = () => {
    return (
       <div className="w-full p-4 border-t bg-black text-white">
            <div className="md:max-w-screen-2xl mx-auto flex items-center justify-center">
                {/* Copyright Text */}
                <div className="text-sm md:text-base text-center">
                    &copy; {new Date().getFullYear()}  BOARDIFY UNIMAL. All Rights Reserved.
                </div>
            </div>
        </div>
    );
};
