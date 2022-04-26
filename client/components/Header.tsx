import Link from 'next/link';
import React, { FC } from 'react'
type ResponseProps = {
    currentUser: {
        email: string;
        iat: number;
        id: string
    }
}
export const Header: FC<ResponseProps> = ({ currentUser }) => {
    return (
        <nav className='navbar navbar-dark bg-dark'>
            <Link href={"/"}>
                <a className="navbar-brand">
                    Ticketin
                </a>
            </Link>
            <div className="d-flex justify-content-end">
                <ul className="nav d-flex align-items-center">
                    {currentUser ? "Sign out" : "Sign in/up"}
                </ul>
            </div>
        </nav>
    )
}
