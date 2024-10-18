import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import LoginPage from "../components/LoginPage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const handleSignUp = async ({ name, email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      navigate("/");
      toast.success("Created an account successfully");
    } catch (error) {
      toast.error("This account is already exist");
      console.error("Error signing up: ", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return <LoginPage isSignedIn={false} onSubmit={handleSignUp} />;
};

export default SignUp;
