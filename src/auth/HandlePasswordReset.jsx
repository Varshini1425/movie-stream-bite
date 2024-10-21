import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import backgroundImage from "../assets/backgroundImage.jpg";

const HandlePasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oobCode, setOobCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const veriyResetCode = async () => {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get("oobCode");

      if (code) {
        setOobCode(code);
        try {
          await verifyPasswordResetCode(auth, code);
          setIsVerifying(false);
        } catch (error) {
          console.error("Error verifying reset code:", error);
          toast.error("Invalid or expired reset link. Please try again.", {
            position: "top-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            className: "bg-gradient-to-r from-red-500 to-orange-500",
          });
          navigate("/reset-password");
        }
      } else {
        navigate("/reset-password");
      }
    };

    veriyResetCode();
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password do not match", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        className: "bg-gradient-to-r from-red-500 to-orange-500",
      });
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password should be at least 6 characters long.", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        className: "bg-gradient-to-r from-red-500 to-orange-500",
      });
      return;
    }
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      toast.success("Password has been reset successfully.", {
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
      navigate("/signin");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again.", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        className: "bg-gradient-to-r from-red-500 to-orange-500",
      });
    }
  };

  if (isVerifying) {
    return <div>Verifying reset Link...</div>;
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="w-full max-w-md p-6 space-y-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Set New Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="new-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HandlePasswordReset;
