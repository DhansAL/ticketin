import { NextPage } from "next";
import Router from "next/router";
import { SyntheticEvent, useState } from "react";
import { UseRequest } from "../../hooks/useRequest";

const Signup: NextPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { doRequest, errors } = UseRequest({
        url: "/api/users/signin",
        method: "post",
        body: {
            email, password
        },
        onSuccess: () => Router.push("/")
    })


    const handleSubmit = async (eve: SyntheticEvent) => {
        eve.preventDefault();
        setEmail("")
        setPassword("")
        await doRequest();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Signin</h1>
            <div className="form-group">
                <label >Email Address</label>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                    className="form-control" />
            </div>
            <div className="form-group">
                <label >Password</label>
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    className="form-control" />
            </div>
            {errors}
            <button className="btn btn-primary">Sign in</button>
        </form>
    )
}
export default Signup