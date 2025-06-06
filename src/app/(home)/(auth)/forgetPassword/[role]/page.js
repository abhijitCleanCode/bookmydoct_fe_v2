"use client";

import { useEffect, useState } from "react";

import useAuthStore from "@/zustandStore/authStore";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EyeClosed, EyeIcon } from "lucide-react";

export default function ForgetPassword() {
  const { role } = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const { forgetPassword, resetPassword, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
  });
  const [showOtpField, setShowOtpField] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const response = await forgetPassword(formData.email, role);

      if (response.status === 200) {
        setShowOtpField(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!formData.otp || !formData.password) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const response = await resetPassword(
        formData.email,
        formData.otp,
        formData.password,
        role
      );
      if (response.status === 200) {
        setShowOtpField(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-full lg:mb-10 flex-1 items-center">
      <div className="flex flex-1 w-[60%] flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
              Forget Password
            </h2>
          </div>

          <div className="mt-10">
            <form
              action="#"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="Your registered email address"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                    />
                  </div>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary hover:opacity-80  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isLoading ? "Processing..." : "Get OTP"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-6">
          <Dialog open={showOtpField} onOpenChange={setShowOtpField}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">
                  Password Reset
                </DialogTitle>

                <p className="mt-2 text-sm/6 text-gray-500">
                  Check your email for the OTP
                </p>
              </DialogHeader>
              <form className="space-y-6" onSubmit={handlePasswordReset}>
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Enter OTP
                  </label>
                  <div className="mt-2">
                    <input
                      id="otp"
                      name="otp"
                      type="number"
                      required
                      placeholder="Enter otp to reset your password"
                      value={formData.otp}
                      onChange={(e) =>
                        setFormData({ ...formData, otp: e.target.value })
                      }
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Enter new password
                  </label>
                  <div className="mt-2 flex justify-between items-center gap-2">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Your new password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className=" text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeClosed className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-primary hover:opacity-80  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {isLoading ? "Processing..." : "Submit"}
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
