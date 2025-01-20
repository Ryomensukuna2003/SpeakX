import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const Navbar = () => {
    return (
        <nav className="flex justify-between items-center  p-4">
            <left className="flex-row">
                <div className="text-white text-lg">Logo</div>
            </left>
            <right className="flex justify-between items-center bg-gray-800  gap-5">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </right>
        </nav>
    )
}