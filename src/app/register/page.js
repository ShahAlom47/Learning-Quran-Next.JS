"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useNotification } from "@/src/components/Notification";
import { generateUniqueId } from "@/src/lib/utilsFunctions";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }
    setLoading(true);
  
    // ইউনিক ID জেনারেট করা
    const userId = generateUniqueId();
  
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId, // ইউনিক ID যোগ করা হচ্ছে
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "user",
          photoUrl:
            "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
        }),
      });
      const data = await res.json();
      console.log(data);
  
      if (!res.ok) throw new Error(data.message || "Registration failed");
      showNotification("Registration successful! Please log in.", "success");
      router.push("/login");
    } catch (error) {
      // Show server response or general error
      showNotification(error.message || (data?.message || "Registration failed"), "error");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
  {[
    { label: "Full Name", id: "name", type: "text", value: formData.name || '' },
    { label: "Email", id: "email", type: "email", value: formData.email || '@gmail.com' },
    { label: "Password", id: "password", type: "password", value: formData.password || '123456' },
    { label: "Confirm Password", id: "confirmPassword", type: "password", value: formData.confirmPassword || '123456' },
  ].map(({ label, id, type, value }) => (
    <div key={id}>
      <label htmlFor={id} className="block mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded bg-slate-100"
      />
    </div>
  ))}
  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
    disabled={loading}
  >
    {loading ? "Registering..." : "Register"}
  </button>
  <p className="text-center mt-4">
    Already have an account?{" "}
    <Link href="/login" className="text-blue-500 hover:text-blue-600">
      Login
    </Link>
  </p>
</form>

    </div>
  );
}
