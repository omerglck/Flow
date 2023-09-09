import { Link } from "react-router-dom";

const AuthLinks = () => {
  return (
    <>
      <Link
        to={"/login"}
        className="px-4 py-2 lg:px-5 lg:py-2.5 mr-2 font-medium rounded-lg hover:bg-blue-700"
      >
        Giriş Yap
      </Link>
      <Link
        to={"/register"}
        className="bg-blue-600 transition hover:bg-blue-700 px-4 py-2 lg:px-5 lg:py-2.5 mr-2 rounded-lg font-medium "
      >
        Haydi Başlayalım
      </Link>
    </>
  );
};

export default AuthLinks;
