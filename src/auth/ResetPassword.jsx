import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import backgroundImage from "../assets/backgroundImage.jpg";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Please check your inbox.", {
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
      setEmail(""); // Clear the email field after successful submission
    } catch (error) {
      console.error("Error sending password reset email: ", error);

      switch (error.code) {
        case "auth/invalid-email":
          toast.error(
            "The email address is invalid. Please enter a valid email."
          );
          break;
        case "auth/user-not-found":
          toast.error("No account found with this email address.");
          break;
        default:
          toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-md p-6 space-y-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Reset Your Password
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>
        <div className="text-sm font-medium text-gray-900 dark:text-white text-center">
          Remember your password?{" "}
          <Link
            to="/signin"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
