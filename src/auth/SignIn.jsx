import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import LoginPage from "../components/LoginPage";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const handleSignIn = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert("Email or password is incorrect");
      console.error("Error signing in: ", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return <LoginPage isSignedIn={true} onSubmit={handleSignIn} />;
};

export default SignIn;
