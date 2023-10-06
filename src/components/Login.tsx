import { useState } from 'react'
import { useAppDispatch, useAppSelector } from "../data/store";
import { loggedIn } from "../api/userSlice";


function Login() {
    // const userData = useAppSelector((state) => state.userApi.user);
    const [username, setUsername] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const dispatch = useAppDispatch();


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (username == "") {
            console.log("Put username");
            return;
        }
        if (pass == "") {
            console.log("Input Password Or Confirm Password");
            return;
        }
        dispatch(loggedIn({ username, pass }));

        const userDataString = localStorage.getItem("userData");

        if (userDataString !== null) {
            const userDataArray = JSON.parse(userDataString);

            if (Array.isArray(userDataArray) && userDataArray.length > 0) {
                for (const user of userDataArray) {
                    if (user.username === username && user.pass === pass) {
                        console.log("LOGGIN")
                        setUsername("");
                        setPass("");
                        // userDataArray.unshift(user);
                        window.location.href = "/";
                    } else {
                        console.log("Wrong Password or Email")
                    }
                }

            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" id="userName" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <input type="password" id="passWord" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
                <a href="/SignUp">SignUp</a>

            </form>
        </>
    )
}

export default Login