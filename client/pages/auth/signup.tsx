import { NextPage } from "next";
import { SyntheticEvent, useState } from "react";
import axios, { AxiosError } from 'axios'

type UserCreds = {
    message: string,
    field: string
}[]
const Signup: NextPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<UserCreds>([])


    const handleSubmit = async (eve: SyntheticEvent) => {
        eve.preventDefault()
        console.log(email, password);
        try {
            const res = await axios.post('/api/users/signup', {
                email, password
            })

        } catch (error) {
            const errors = error as AxiosError;
            if (!axios.isAxiosError(errors)) {
                console.log(errors);
            }
            setErrors(errors.response?.data)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Signup</h1>
            <div className="form-group">
                <label >Email Address</label>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
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
            {errors.length > 0 && (
                <div className="alert alert-danger">
                    <h1>oops...</h1>
                    <ul className="my-0">
                        {errors.map(err => (
                            <li key={err.message}>{err.message}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button className="btn btn-primary">Sign up</button>
        </form>
    )
}
export default Signup