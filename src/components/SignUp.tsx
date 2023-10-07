import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../data/store";
import { createUser } from "../api/userSlice";

function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const dispatch = useAppDispatch();

  //
  const userData = useAppSelector((state) => state.userApi.user);
  localStorage.setItem("userData", JSON.stringify(userData));
  // useEffect(() => { localStorage.setItem("userData", JSON.stringify(userData)); }, [localStorage.setItem("userData", JSON.stringify(userData))])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (username == "") {
      console.log("Put username");
      return;
    }
    if (pass == "" && confirmPass == "") {
      console.log("Input Password Or Confirm Password");
      return;
    }
    if (pass !== confirmPass) {
      console.log("Doesn't Match Password and Confirm Password");
      return;
    }
    dispatch(createUser({ username, pass }));

    setUsername("");
    setPass("");
    setConfirmPass("");

    // window.location.href = "/";
    // console.log(userData)
  };

  return (
    <div>
      <h3>Create Account:</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" id="userName" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <input type="password" id="passWord" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
        </div>
        <div>
          <input type="password" id="CpassWord" placeholder="Confirm Password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
        </div>
        <div>
          <button type="submit">Create Account</button>
        </div>
        <a href="/Login">Login</a>
      </form>
      {/* <tbody>
                {userData.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.pass}</td>
                    </tr>
                ))}
            </tbody> */}
    </div>
  );
}

export default SignUp;
