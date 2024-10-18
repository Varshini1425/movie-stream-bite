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
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error("Email or password is incorrect", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
      console.error("Error signing in: ", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return <LoginPage isSignedIn={true} onSubmit={handleSignIn} />;
};

export default SignIn;
