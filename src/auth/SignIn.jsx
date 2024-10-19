import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import LoginPage from "../components/LoginPage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();
  const handleSignIn = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("Logged in successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        className: "bg-gradient-to-r from-purple-500 to-blue-500",
      });
    } catch (error) {
      toast.error("Email or password is incorrect", {
        position: "topt-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        className: "bg-gradient-to-r from-red-500 to-orange-500",
      });
      console.error("Error signing in: ", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return <LoginPage isSignedIn={true} onSubmit={handleSignIn} />;
};

export default SignIn;
