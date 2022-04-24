import axios, { AxiosError } from "axios";
import { useState } from "react";

type ResError = {
  message: string;
  field: string;
};
type options = {
  url: string;
  method: "get" | "post" | "patch"; //anonymous string will make axios typescript angry lol
  body: any;
};

export const UseRequest = (options: options) => {
  const { url, method, body } = options;
  const [errors, setErrors] = useState<JSX.Element>(); //errors to send from hook

  const doRequest = async () => {
    try {
      const res = await axios[method](url, body);
      return res.data;

    } catch (err) {
      // in case its not an axios err
      if (!axios.isAxiosError(err)) {
        console.log("unknown error occured while sending the req", err);
      }

      const incomingErr = err as AxiosError
      setErrors(<div className="alert alert-danger">
        <h1>oops...</h1>
        <ul className="my-0">
          {incomingErr.response?.data.errors.map((err: ResError) => (
            <li key={err.message}>{err.message}</li>
          ))}
        </ul>
      </div>)

    }
  };
  return { doRequest, errors }
};
