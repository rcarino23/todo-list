import { useState } from "react";
import { useAppDispatch } from "../data/store";
import { createUser } from "../api/userSlice";



function SignUp() {
    const [username, setUsername] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [confirmpass, setConfirmPass] = useState<string>("");


    const dispatch = useAppDispatch();


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (username == "") {
            console.log("Put username");
            return;
        }

        if (pass == "" && confirmpass == "") {
            console.log("Input Password Or Confirm Password");
            return;
        }

        if (pass !== confirmpass) {
            console.log("Doesn't Match Password and Confirm Password");
            return;
        }

        dispatch(createUser({ username, pass }));
        setUsername("");
        setPass("");
        setConfirmPass("");
    };

    return (
        <div>
            <h3>Create TODO:</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" id="userName" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" id="passWord" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
                <input type="password" id="passWord" placeholder="Password" value={confirmpass} onChange={(e) => setConfirmPass(e.target.value)} />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default SignUp