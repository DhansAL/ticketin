import Router from 'next/router'
import React, { useEffect } from 'react'
import { UseRequest } from '../../hooks/useRequest'

const Signout = () => {
    const { doRequest } = UseRequest({
        url: "/api/users/signout",
        method: "post",
        body: {},
        onSuccess: () => Router.push("/")
    })

    useEffect(() => {
        doRequest()
    }, [])
    return (
        <div>signing you out...</div>
    )
}
export default Signout