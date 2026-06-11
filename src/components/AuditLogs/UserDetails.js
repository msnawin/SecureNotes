import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { useForm } from "react-hook-form";
import InputField from "../InputField/InputField";
import { Blocks } from "react-loader-spinner";
import Buttons from "../../utils/Buttons";
import toast from "react-hot-toast";
import Errors from "../Errors";

const UserDetails = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const [loading, setLoading] = useState(false);
  const [updateRoleLoader, setUpdateRoleLoader] = useState(false);
  const [passwordLoader, setPasswordLoader] = useState(false);

  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState(null);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const fetchUserDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/user/${userId}`);
      setUser(response.data);

      setSelectedRole(response.data.role?.roleName || "");
    } catch (err) {
      setError(err?.response?.data?.message);
      console.error("Error fetching user details", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    //if user exist set the value by using the setValue function provided my react-hook-form
    if (user && Object.keys(user).length > 0) {
      setValue("username", user.userName);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  const fetchRoles = useCallback(async () => {
    try {
      const response = await api.get("/admin/roles");
      setRoles(response.data);
    } catch (err) {
      setError(err?.response?.data?.message);
      console.error("Error fetching roles", err);
    }
  }, []);

  useEffect(() => {
    fetchUserDetails();
    fetchRoles();
  }, [fetchUserDetails, fetchRoles]);

  //set the selected role
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  //handle update role
  const handleUpdateRole = async () => {
    setUpdateRoleLoader(true);
    try {
      const formData = new URLSearchParams();
      formData.append("userId", userId);
      formData.append("roleName", selectedRole);

      await api.put(`/admin/update-role`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      fetchUserDetails();
      toast.success("Update role successful");
    } catch (err) {
      console.log(err);
      toast.error("Update Role Failed");
    } finally {
      setUpdateRoleLoader(false);
    }
  };

  //handle update the password
  const handleSavePassword = async (data) => {
    setPasswordLoader(true);
    const newPassword = data.password;

    try {
      const formData = new URLSearchParams();
      formData.append("userId", userId);
      formData.append("password", newPassword);

      await api.put(`/admin/update-password`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      setIsEditingPassword(false);
      setValue("password", "");
      //fetchUserDetails();
      toast.success("password update success");
    } catch (err) {
      toast.error("Error updating password " + err.response.data);
    } finally {
      setPasswordLoader(false);
    }
  };

  const handleCheckboxChange = async (e, updateUrl) => {
    const { name, checked } = e.target;

    let message = null;
    if (name === "lock") {
      message = "Update Account Lock status Successful";
    } else if (name === "expire") {
      message = "Update Account Expiry status Successful";
    } else if (name === "enabled") {
      message = "Update Account Enabled status Successful";
    } else if (name === "credentialsExpire") {
      message = "Update Account Credentials Expired status Successful";
    }

    try {
      const formData = new URLSearchParams();
      formData.append("userId", userId);

      formData.append(name, checked);

      await api.put(updateUrl, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      fetchUserDetails();
      toast.success(message);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.log(`Error updating ${name}:`);
    } finally {
      message = null;
    }
  };

  if (error) {
    return <Errors message={error} />;
  }

  return (
    <div className="sm:px-12 px-4 py-10 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-vault-500/5 rounded-full blur-3xl pointer-events-none" />

      {loading ? (
        <div className="flex flex-col justify-center items-center h-72 relative z-10">
          <span>
            <Blocks
              height="70"
              width="70"
              color="#10b981"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              visible={true}
            />
          </span>
          <span className="text-surface-400 mt-2">Please wait...</span>
        </div>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto relative z-10">
          {/* Profile Details Card */}
          <div className="glass-card p-6 border border-white/[0.08]">
            <div>
              <h1 className="text-surface-100 text-2xl font-bold font-outfit pb-2">
                Profile Information
              </h1>
              <hr className="border-white/[0.08] mb-6" />
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(handleSavePassword)}
              >
                <InputField
                  label="UserName"
                  required
                  id="username"
                  className="w-full"
                  type="text"
                  message="*UserName is required"
                  placeholder="Enter your UserName"
                  register={register}
                  errors={errors}
                  readOnly
                />
                <InputField
                  label="Email"
                  required
                  id="email"
                  className="w-full"
                  type="text"
                  message="*Email is required"
                  placeholder="Enter your Email"
                  register={register}
                  errors={errors}
                  readOnly
                />
                <InputField
                  label="Password"
                  required
                  autoFocus={isEditingPassword}
                  id="password"
                  className="w-full"
                  type="password"
                  message="*Password is required"
                  placeholder="Enter your Password"
                  register={register}
                  errors={errors}
                  readOnly={!isEditingPassword}
                  min={6}
                />
                {!isEditingPassword ? (
                  <button
                    type="button"
                    onClick={() => setIsEditingPassword(!isEditingPassword)}
                    className="bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 w-fit"
                  >
                    Click To Edit Password
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      className="vault-btn text-white px-6 py-2.5 rounded-lg font-semibold"
                    >
                      {passwordLoader ? "Loading.." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingPassword(!isEditingPassword)}
                      className="bg-surface-800 border border-white/10 hover:bg-surface-700 text-surface-200 px-6 py-2.5 rounded-lg font-semibold transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Admin Actions Card */}
          <div className="glass-card p-6 border border-white/[0.08]">
            <h1 className="text-surface-100 text-2xl font-bold font-outfit pb-2">
              Admin Actions
            </h1>
            <hr className="border-white/[0.08] mb-6" />

            <div className="py-2 flex sm:flex-row flex-col sm:items-center items-start gap-4">
              <div className="flex items-center gap-3">
                <label className="text-surface-300 text-sm font-semibold uppercase tracking-wider font-outfit">
                  Role:
                </label>
                <select
                  className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.1] text-surface-200 outline-none focus:border-vault-500/50 uppercase text-xs font-semibold tracking-wider transition-all duration-300"
                  value={selectedRole}
                  onChange={handleRoleChange}
                >
                  {roles.map((role) => (
                    <option
                      className="bg-surface-900 text-surface-200 uppercase"
                      key={role.roleId}
                      value={role.roleName}
                    >
                      {role.roleName}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="vault-btn hover:text-white px-5 py-2 rounded-lg font-semibold"
                onClick={handleUpdateRole}
              >
                {updateRoleLoader ? "Updating..." : "Update Role"}
              </button>
            </div>

            <hr className="border-white/[0.06] my-6" />
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
              <div className="flex items-center justify-between p-4 bg-white/[0.01] border border-white/[0.05] rounded-xl hover:border-vault-500/10 transition-colors duration-200">
                <label className="text-surface-300 text-sm font-semibold uppercase font-outfit tracking-wide cursor-pointer" htmlFor="lock">
                  Lock Account
                </label>
                <input
                  id="lock"
                  className="accent-vault-500 w-5 h-5 cursor-pointer"
                  type="checkbox"
                  name="lock"
                  checked={!user?.accountNonLocked}
                  onChange={(e) =>
                    handleCheckboxChange(e, "/admin/update-lock-status")
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white/[0.01] border border-white/[0.05] rounded-xl hover:border-vault-500/10 transition-colors duration-200">
                <label className="text-surface-300 text-sm font-semibold uppercase font-outfit tracking-wide cursor-pointer" htmlFor="expire">
                  Account Expiry
                </label>
                <input
                  id="expire"
                  className="accent-vault-500 w-5 h-5 cursor-pointer"
                  type="checkbox"
                  name="expire"
                  checked={!user?.accountNonExpired}
                  onChange={(e) =>
                    handleCheckboxChange(e, "/admin/update-expiry-status")
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white/[0.01] border border-white/[0.05] rounded-xl hover:border-vault-500/10 transition-colors duration-200">
                <label className="text-surface-300 text-sm font-semibold uppercase font-outfit tracking-wide cursor-pointer" htmlFor="enabled">
                  Account Enabled
                </label>
                <input
                  id="enabled"
                  className="accent-vault-500 w-5 h-5 cursor-pointer"
                  type="checkbox"
                  name="enabled"
                  checked={user?.enabled}
                  onChange={(e) =>
                    handleCheckboxChange(e, "/admin/update-enabled-status")
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white/[0.01] border border-white/[0.05] rounded-xl hover:border-vault-500/10 transition-colors duration-200">
                <label className="text-surface-300 text-sm font-semibold uppercase font-outfit tracking-wide cursor-pointer" htmlFor="credentialsExpire">
                  Credentials Expired
                </label>
                <input
                  id="credentialsExpire"
                  className="accent-vault-500 w-5 h-5 cursor-pointer"
                  type="checkbox"
                  name="credentialsExpire"
                  checked={!user?.credentialsNonExpired}
                  onChange={(e) =>
                    handleCheckboxChange(
                      e,
                      `/admin/update-credentials-expiry-status?userId=${userId}&expire=${user?.credentialsNonExpired}`
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
