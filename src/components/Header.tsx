import { useEffect, useState } from "react";


function Header() {
    const [disable, setDisable] = useState<Boolean>(true);
    const userDataString = localStorage.getItem("userData");

    useEffect(() => {
        if (userDataString !== null) {
            setDisable(false);
        }
    }, [userDataString])

    return (
        <>
            {disable &&
                <>
                    <a href="/SignUp">SignUp</a>
                </>
            }
        </>
    )
}

export default Header