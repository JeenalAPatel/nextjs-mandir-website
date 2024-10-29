import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="font-sans text-gray-900 bg-gray-100 font-inter">
        <div>
            <div className="flex flex-col bg-[#7a6855] text-4xl">
                <div className="flex flex-row pt-10 pb-10">
                    <div>
                        <img src="https://apps.na.baps.org/pcm/assets/layout/images/header-logo.png" alt="logo"
                             width={50} height={50}/>
                    </div>
                    <div>
                        <h1 className="text-white">Personal Care & Management</h1>
                    </div>
                </div>


            </div>
            <div className="flex flex-row">
                <div className="flex w-48 h-screen border border-r-blue-950">
                    <ul>
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li><Link href="/registration">Registration</Link></li>
                        <li><Link href="/slot">Slot</Link></li>
                    </ul>
                </div>
                <div className="flex-1">{children}</div>
            </div>
        </div>
        </body>
        </html>
    );
}
