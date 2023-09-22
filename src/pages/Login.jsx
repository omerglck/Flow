import { Link } from "react-router-dom";
import InputArea from "../components/InputArea";
import { validate } from "./../utils/helpers";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "./../context/UserContext";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();

  const { loginToAccount } = useContext(UserContext);

  if (localStorage.getItem("token")) {
    navigate("/home");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (validate({ email, password })) {
      loginToAccount(email, password);
    } else {
      toast.info("Formu Doldurunuz...", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  return (
    <section className="bg-gray-900 ">
      <div className="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <Link className="flex items-center mb-6 transition hover:scale-105">
          <img className="w-8 h-8 mr-2 " src="/logo.svg" />
          <span className="text-2xl font-semibold text-white">Flow</span>
        </Link>

        <div className="w-full sm:max-w-md bg-gray-800 border border-gray-500 rounded-lg shadow ">
          <div className="p-6 text-gray-300 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="border border-gray-500 text-center font-bold py-2 rounded-lg">
              Giriş Yap
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <InputArea
                label={"Email:"}
                holder={"example@example.com"}
                name={"email"}
                type={"email"}
              />
              <InputArea
                label={"Şifre:"}
                holder={"••••••••"}
                name={"password"}
                type={"password"}
              />
              <button className="w-full bg-blue-800 transition hover:bg-blue-900 font-medium rounded-lg px-5 py-2.5 text-sm">
                Giriş Yap
              </button>
              <p className="text-sm text-gray-400">
                Henüz hesabınız yok mu ?{" "}
                <Link
                  to={"/register"}
                  className="mx-2 text-gray-300 hover:underline hover:text-white"
                >
                  Kaydol
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
