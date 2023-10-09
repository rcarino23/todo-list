import { useEffect, useState } from "react";

function Header() {
  const [isShow, setIsShow] = useState<boolean>(true);
  const userDataString = localStorage.getItem("userData");

  useEffect(() => {
    if (userDataString !== null) {
      setIsShow(false);
    }
  }, [userDataString]);

  return (
    <>
      {isShow && (
        <>
          <a href="/SignUp">SignUp</a>
        </>
      )}
    </>
  );
}

export default Header;
