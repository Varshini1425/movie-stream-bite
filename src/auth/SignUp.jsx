import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
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
      await sendEmailVerification(userCredential.user);
      toast.success(
        "Account created successfully. A verification email has been sent to your inbox."
      );
      toast.info("Please verify your email before logging in.");
      navigate("/signin");
    } catch (error) {
      console.error("Error signing up: ", error);
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("This email is already associated with an account.");
          break;
        case "auth/invalid-email":
          toast.error(
            "The email address is invalid. Please enter a valid email."
          );
          break;
        case "auth/weak-password":
          toast.error(
            "The password is too weak. Please choose a stronger password."
          );
          break;
        case "auth/missing-email":
          toast.error("Please enter an email address.");
          break;
        case "auth/missing-password":
          toast.error("Please enter a password.");
          break;
        default:
          toast.error(
            "An error occurred while creating your account. Please try again."
          );
      }
    }
  };

  return <LoginPage isSignedIn={false} onSubmit={handleSignUp} />;
};

export default SignUp;
