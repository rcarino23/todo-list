import { useState } from "react";
import { useAppDispatch } from "../data/store";
import { loggedIn } from "../api/userSlice";

function Login() {
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

    // refactor : DONE
    if (userDataString === null) {
      return;
    }
    const userDataArray = JSON.parse(userDataString);
    if (!userDataArray && userDataArray.length < 0) {
      return;
    }
    for (const user of userDataArray) {
      if (user.username === username && user.pass === pass) {
        console.log("LOGGIN");
        setUsername("");
        setPass("");
        window.location.href = "/";
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="userName"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            id="passWord"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <a href="/SignUp">SignUp</a>
      </form>
    </>
  );
}

export default Login;
