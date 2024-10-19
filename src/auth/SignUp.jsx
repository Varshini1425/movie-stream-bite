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
        "Account created successfully. A verification email has been sent to your inbox.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          className: "bg-gradient-to-r from-purple-500 to-blue-500",
        }
      );
      toast.info("Please verify your email before logging in.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        className: "bg-gradient-to-r from-purple-500 to-blue-500",
      });
      navigate("/signin");
    } catch (error) {
      console.error("Error signing up: ", error);
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("This email is already associated with an account.", {
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
          break;
        case "auth/invalid-email":
          toast.error(
            "The email address is invalid. Please enter a valid email.",
            {
              position: "topt-left",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              className: "bg-gradient-to-r from-red-500 to-orange-500",
            }
          );
          break;
        case "auth/weak-password":
          toast.error(
            "The password is too weak. Please choose a stronger password.",
            {
              position: "topt-left",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              className: "bg-gradient-to-r from-red-500 to-orange-500",
            }
          );
          break;
        case "auth/missing-email":
          toast.error("Please enter an email address.", {
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
          break;
        case "auth/missing-password":
          toast.error("Please enter a password.", {
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
          break;
        default:
          toast.error(
            "An error occurred while creating your account. Please try again.",
            {
              position: "topt-left",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              className: "bg-gradient-to-r from-red-500 to-orange-500",
            }
          );
      }
    }
  };

  return <LoginPage isSignedIn={false} onSubmit={handleSignUp} />;
};

export default SignUp;
