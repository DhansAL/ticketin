import Link from 'next/link';
import React, { FC } from 'react'
type ResponseProps = {
    children?: React.ReactNode;
    currentUser: {
        email: string;
        iat: number;
        id: string
    }
}
export const Header: FC<ResponseProps> = (props) => {
    const { currentUser, children } = props
    const links = [
        !currentUser && { label: "Signup", href: "/auth/signup" },
        !currentUser && { label: "Signin", href: "/auth/signin" },
        currentUser && { label: "Signout", href: "/auth/signout" }

    ]
        .filter(linkConfig => linkConfig)
        .map((i: any, k: number) => {
            return <li key={k} className="nav-item">
                <Link href={i.href}>
                    <a className="nav-link text-white"> {i.label}</a>
                </Link>
            </li>
        })



    return (<>
        <nav className='navbar navbar-light bg-dark'>
            <Link href={"/"}>
                <a className="navbar-brand text-white">
                    Ticketin
                </a>
            </Link>
            <div className="d-flex justify-content-between">
                <ul className="nav d-flex align-items-center text-white">
                    {links}
                </ul>
            </div>
        </nav>
        {children}
    </>


    )
}
