"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export const LoginForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const searchParams = useSearchParams();
    const callbackUrl =  "/";

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFormValues({ email: "", password: "" });

        const res = await signIn("credentials", {
            redirect: false,
            email: formValues.email,
            password: formValues.password,
            callbackUrl,
        });

        setLoading(false);
        console.log(res);
        if (!res?.error) {
            router.push(callbackUrl);
        } else {
            setError("invalid email or password");
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const input_style =
        "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

    return (
        // <form onSubmit={onSubmit}>
        //     {error && (
        //         <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
        //     )}
        //     <div className="mb-6">
        //         <input
        //             required
        //             type="email"
        //             name="email"
        //             value={formValues.email}
        //             onChange={handleChange}
        //             placeholder="Email address"
        //             className={`${input_style}`}
        //         />
        //     </div>
        //     <div className="mb-6">
        //         <input
        //             required
        //             type="password"
        //             name="password"
        //             value={formValues.password}
        //             onChange={handleChange}
        //             placeholder="Password"
        //             className={`${input_style}`}
        //         />
        //     </div>
        //     <button
        //         type="submit"
        //         style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
        //         className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        //         disabled={loading}
        //     >
        //         {loading ? "loading..." : "Sign In"}
        //     </button>

        // </form>
        <div className="login relative">
            <img src="/img/login-bg.png" alt="image" className="login__bg" />

            <form onSubmit={onSubmit} className="login__form">
                <h1 className="login__title">Login</h1>

                <div className="login__inputs">
                    {error && (
                        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
                    )}
                    <div className="login__box">
                        <input name="email" onChange={handleChange} value={formValues.email} type="email" placeholder="Email ID" required className="login__input bg-transparent" />
                        <i className="ri-mail-fill"></i>
                    </div>

                    <div className="login__box">
                        <input type="password" onChange={handleChange} value={formValues.password} name="password" placeholder="Password" required className="login__input" />
                        <i className="ri-lock-2-fill"></i>
                    </div>
                </div>
                <button disabled={loading} type="submit" className="login__button mt-6">{loading ? "loading..." : "Sign In"}</button>

                <div className="login__register">
                    Don't have an account? <a href="/register">Register</a>
                </div>
            </form>
        </div>
    );
};
