import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNotification } from "./Notification";

const EditUserForm = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const { showNotification } = useNotification();

  // State for form fields
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    photoUrl: user?.photoUrl || "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required!";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format!";
    }
    if (!formData.photoUrl.trim()) newErrors.photoUrl = "Photo URL is required!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification("Please fix the errors!", "error");
      return;
    }

    try {
      dispatch(updateUser({ userId: user.userId, updatedData: formData }));
      showNotification("User updated successfully!", "success");
      onClose(); // Close modal or form
    } catch (error) {
      showNotification("Failed to update user!", "error");
    }
  };

  return (

      <div className="bg-white p-6 rounded shadow-lg w-[90%] md:w-[500px] relative text-black">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-3">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-gray-300 text-black"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-gray-300 text-black"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Photo URL Field */}
          <div className="mb-3">
            <label className="block text-sm font-medium">Photo URL</label>
            <input
              type="text"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-gray-300 text-black"
            />
            {errors.photoUrl && <p className="text-red-500 text-sm">{errors.photoUrl}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Update
            </button>
          </div>
        </form>
      </div>
    
  );
};

export default EditUserForm;
