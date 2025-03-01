"use client";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Eye, EyeOff, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useAuthStore from "@/zustandStore/authStore";
import { useRouter } from "next/navigation";

export default function ClinicSignUp() {
  const { signup, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    addressOne: "",
    addressTwo: "",
    city: "",
    state: "",
    pincode: "",
    adminName: "",
    adminEmail: "",
    password: "",
    confirmPassword: "",
    lattitude: "",
    longitude: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          lattitude: latitude,
          longitude: longitude,
        }));
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSubmit = async (e) => {
    //ask for location

    e.preventDefault();
    const userdata = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      addressOne: formData.addressOne,
      addressTwo: formData.addressTwo,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      password: formData.password,
      userName: formData.adminName,
      userEmail: formData.adminEmail,
      lattitude: formData.lattitude,
      longitude: formData.longitude,
    };

    try {
      await signup(userdata, "clinic");
      router.replace("/login/clinic");
    } catch (error) { }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <>
      <div className="flex min-h-full flex-row-reverse lg:mb-10 flex-1 items-center ">
        <div className="flex flex-1 w-[60%] flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-10 xl:px-10">
          <div className="w-full mx-auto max-w-lg">
            <div>
              <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
                Register clinic
              </h2>
              <p className="mt-2 text-sm/6 text-gray-500">
                Already have a clinic account ?{" "}
                <Link
                  href={`/login/clinic`}
                  className="font-semibold text-primary hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form
                  action="#"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="name">Clinic Name</Label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                      placeholder="Clinic name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                      placeholder="Clinic email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                      placeholder="+912545454545"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address Line 1</Label>
                    <input
                      id="addressOne"
                      name="addressOne"
                      value={formData.addressOne}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                      placeholder="Clinic address 1"
                    />
                  </div>
                  <div className="space-y-2 ">
                    <Label htmlFor="address">
                      Address Line 2{" "}
                      <span className="text-sm text-gray-500">(optional)</span>
                    </Label>
                    <input
                      id="addressTwo"
                      name="addressTwo"
                      value={formData.addressTwo}
                      onChange={handleInputChange}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                      placeholder="Clinic address 2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                      placeholder="Clinic city"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">State:</Label>
                    <input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                      placeholder="Clinic State"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Pincode:</Label>
                    <input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                      placeholder="Clinic Area Pincode"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminName">Admin Name</Label>
                    <input
                      id="adminName"
                      name="adminName"
                      value={formData.adminName}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                      placeholder="Admin name"
                    />
                  </div>

                  <div className="space-y-2 ">
                    <Label htmlFor="adminEmail">Admin Email:</Label>
                    <input
                      id="adminEmail"
                      name="adminEmail"
                      value={formData.adminEmail}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                      placeholder="Admin Email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                        placeholder="Enter at least 8+ characters"
                      />
                      <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeClosed className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showConfirmPassword ? (
                          <EyeClosed className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="md:col-span-2 flex w-full justify-center rounded-md bg-primary hover:opacity-80  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Sign Up"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden w-[40%] flex-1 justify-end items-center  lg:flex">
          <Image
            alt=""
            src="/register.svg"
            height={1000}
            width={400}
            className="object-cover h-[400px]"
          />
        </div>
      </div>
    </>
  );
}
