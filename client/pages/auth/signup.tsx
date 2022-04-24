import { NextPage } from "next";
import { SyntheticEvent, useState } from "react";
import { UseRequest } from "../../hooks/useRequest";



const Signup: NextPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { doRequest, errors } = UseRequest({
        url: "/api/users/signup",
        method: "post",
        body: {
            email, password
        }
    })


    const handleSubmit = async (eve: SyntheticEvent) => {
        eve.preventDefault()
        doRequest()
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Signup</h1>
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
            <button className="btn btn-primary">Sign up</button>
        </form>
    )
}
export default Signup