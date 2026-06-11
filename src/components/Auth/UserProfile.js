import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useMyContext } from "../../store/ContextApi";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InputField from "../InputField/InputField";
import { useForm } from "react-hook-form";
import Buttons from "../../utils/Buttons";
import Switch from "@mui/material/Switch";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { Blocks } from "react-loader-spinner";
import moment from "moment";
import Errors from "../Errors";

const UserProfile = () => {
  // Access the currentUser and token hook using the useMyContext custom hook from the ContextProvider
  const { currentUser, token, isAdmin } = useMyContext();
  //set the loggin session from the token
  const [loginSession, setLoginSession] = useState(null);

  const [credentialExpireDate, setCredentialExpireDate] = useState(null);
  const [pageError, setPageError] = useState(false);

  const [accountExpired, setAccountExpired] = useState();
  const [accountLocked, setAccountLock] = useState();
  const [accountEnabled, setAccountEnabled] = useState();
  const [credentialExpired, setCredentialExpired] = useState();

  const [openAccount, setOpenAccount] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enable, Step 2: Verify

  //loading state
  const [loading, setLoading] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const [disabledLoader, setDisbledLoader] = useState(false);
  const [twofaCodeLoader, settwofaCodeLoader] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm({
    defaultValues: {
      username: currentUser?.username,
      email: currentUser?.email,
      password: "",
    },
    mode: "onTouched",
  });

  //fetching the 2fa sttaus

  useEffect(() => {
    setPageLoader(true);

    const fetch2FAStatus = async () => {
      try {
        const response = await api.get(`/auth/user/2fa-status`);
        setIs2faEnabled(response.data.is2faEnabled);
      } catch (error) {
        console.error("Error fetching 2FA status", error);
        toast.error("Error fetching 2FA status");
      } finally {
        setPageLoader(false);
      }
    };
    fetch2FAStatus();
  }, []);

  //enable the 2fa
  const enable2FA = async () => {
    setDisbledLoader(true);
    try {
      const response = await api.post(`/auth/enable-2fa`);
      setQrCodeUrl(response.data);
      setStep(2);
    } catch (error) {
      toast.error("Error enabling 2FA");
    } finally {
      setDisbledLoader(false);
    }
  };

  //diable the 2fa

  const disable2FA = async () => {
    setDisbledLoader(true);
    try {
      await api.post(`/auth/disable-2fa`);
      setIs2faEnabled(false);
      setQrCodeUrl("");
    } catch (error) {
      toast.error("Error disabling 2FA");
    } finally {
      setDisbledLoader(false);
    }
  };

  //verify the 2fa
  const verify2FA = async () => {
    if (!code || code.trim().length === 0)
      return toast.error("Please Enter The Code To Verify");

    settwofaCodeLoader(true);

    try {
      const formData = new URLSearchParams();
      formData.append("code", code);

      await api.post(`/auth/verify-2fa`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      toast.success("2FA verified successful");

      setIs2faEnabled(true);
      setStep(1);
    } catch (error) {
      console.error("Error verifying 2FA", error);
      toast.error("Invalid 2FA Code");
    } finally {
      settwofaCodeLoader(false);
    }
  };

  //update the credentials
  const handleUpdateCredential = async (data) => {
    const newUsername = data.username;
    const newPassword = data.password;

    try {
      setLoading(true);
      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("newUsername", newUsername);
      formData.append("newPassword", newPassword);
      await api.post("/auth/update-credentials", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      //fetchUser();
      toast.success("Update Credential successful");
    } catch (error) {
      toast.error("Update Credential failed");
    } finally {
      setLoading(false);
    }
  };

  //set the status of (credentialsNonExpired, accountNonLocked, enabled and credentialsNonExpired) current user
  useEffect(() => {
    if (currentUser?.id) {
      setValue("username", currentUser.username);
      setValue("email", currentUser.email);
      setAccountExpired(!currentUser.accountNonExpired);
      setAccountLock(!currentUser.accountNonLocked);
      setAccountEnabled(currentUser.enabled);
      setCredentialExpired(!currentUser.credentialsNonExpired);

      //moment npm package is used to format the date
      const expiredFormatDate = moment(
        currentUser?.credentialsExpiryDate
      ).format("D MMMM YYYY");
      setCredentialExpireDate(expiredFormatDate);
    }
  }, [currentUser, setValue]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);

      const lastLoginSession = moment
        .unix(decodedToken.iat)
        .format("dddd, D MMMM YYYY, h:mm A");
      //set the loggin session from the token
      setLoginSession(lastLoginSession);
    }
  }, [token]);

  //update the AccountExpiryStatus
  const handleAccountExpiryStatus = async (event) => {
    setAccountExpired(event.target.checked);

    try {
      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("expire", event.target.checked);

      await api.put("/admin/update-expiry-status", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      //fetchUser();
      toast.success("Update Account Expirey Status");
    } catch (error) {
      toast.error("Update expirey status failed");
    } finally {
      setLoading(false);
    }
  };

  //update the AccountLockStatus
  const handleAccountLockStatus = async (event) => {
    setAccountLock(event.target.checked);

    try {
      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("lock", event.target.checked);

      await api.put("/admin/update-lock-status", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      //fetchUser();
      toast.success("Update Account Lock Status");
    } catch (error) {
      toast.error("Update Account Lock status failed");
    } finally {
      setLoading(false);
    }
  };

  //update the AccountEnabledStatus
  const handleAccountEnabledStatus = async (event) => {
    setAccountEnabled(event.target.checked);
    try {
      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("enabled", event.target.checked);

      await api.put("/admin/update-enabled-status", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      //fetchUser();
      toast.success("Update Account Enabled Status");
    } catch (error) {
      toast.error("Update Account Enabled status failed");
    } finally {
      setLoading(false);
    }
  };

  //update the CredentialExpiredStatus
  const handleCredentialExpiredStatus = async (event) => {
    setCredentialExpired(event.target.checked);
    try {
      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("expire", event.target.checked);

      await api.put("/admin/update-credentials-expiry-status", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      //fetchUser();
      toast.success("Update Credentials Expiry Status");
    } catch (error) {
      toast.error("Credentials Expiry Status Failed");
    } finally {
      setLoading(false);
    }
  };

  if (pageError) {
    return <Errors message={pageError} />;
  }

  //two function for opening and closing the according
  const onOpenAccountHandler = () => {
    setOpenAccount(!openAccount);
    setOpenSetting(false);
  };
  const onOpenSettingHandler = () => {
    setOpenSetting(!openSetting);
    setOpenAccount(false);
  };

  return (
    <div className="min-h-[calc(100vh-74px)] py-10 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-vault-500/5 rounded-full blur-3xl pointer-events-none" />

      {pageLoader ? (
        <div className="flex flex-col justify-center items-center h-72">
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
        <div className="xl:w-[70%] lg:w-[80%] sm:w-[90%] w-full sm:mx-auto sm:px-0 px-4 min-h-[500px] flex lg:flex-row flex-col gap-6 relative z-10">
          {/* Profile Details & Settings Card */}
          <div className="flex-1 flex flex-col glass-card p-6 border border-white/[0.08]">
            <div className="flex flex-col items-center gap-3 mb-6">
              <Avatar
                alt={currentUser?.username}
                src="/static/images/avatar/1.jpg"
                sx={{ width: 64, height: 64, border: "2px solid rgba(16,185,129,0.3)" }}
              />
              <h3 className="font-bold text-2xl text-surface-100 font-outfit">
                {currentUser?.username}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="glass-card bg-white/[0.02] border border-white/[0.05] p-4 space-y-2">
                <h1 className="font-semibold text-sm text-surface-300 font-outfit flex justify-between items-center">
                  <span>UserName:</span>
                  <span className="text-surface-100 font-normal">{currentUser?.username}</span>
                </h1>
                <h1 className="font-semibold text-sm text-surface-300 font-outfit flex justify-between items-center">
                  <span>Role:</span>
                  <span className="text-surface-100 font-normal uppercase tracking-wider text-xs bg-vault-500/10 text-vault-400 px-2 py-0.5 rounded">
                    {currentUser && currentUser["roles"][0]}
                  </span>
                </h1>
              </div>

              <div className="space-y-3">
                <Accordion 
                  expanded={openAccount}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    borderRadius: "12px !important",
                    color: "#e4e4e7",
                    boxShadow: "none",
                    "&:before": { display: "none" }
                  }}
                >
                  <AccordionSummary
                    onClick={onOpenAccountHandler}
                    expandIcon={<ArrowDropDownIcon sx={{ color: "#10b981" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{
                      borderBottom: openAccount ? "1px solid rgba(255, 255, 255, 0.06)" : "none",
                      "& .MuiAccordionSummary-content": { margin: "12px 0" }
                    }}
                  >
                    <h3 className="text-surface-100 text-base font-semibold font-outfit">
                      Update User Credentials
                    </h3>
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: "16px 20px" }}>
                    <form
                      className="flex flex-col gap-3"
                      onSubmit={handleSubmit(handleUpdateCredential)}
                    >
                      <InputField
                        label="UserName"
                        required
                        id="username"
                        className="text-sm"
                        type="text"
                        message="*Username is required"
                        placeholder="Enter your username"
                        register={register}
                        errors={errors}
                      />
                      <InputField
                        label="Email"
                        required
                        id="email"
                        className="text-sm"
                        type="email"
                        message="*Email is required"
                        placeholder="Enter your email"
                        register={register}
                        errors={errors}
                        readOnly
                      />
                      <InputField
                        label="Enter New Password"
                        id="password"
                        className="text-sm"
                        type="password"
                        message="*Password is required"
                        placeholder="type your password"
                        register={register}
                        errors={errors}
                        min={6}
                      />
                      <Buttons
                        disabled={loading}
                        className="vault-btn font-semibold flex justify-center text-white w-full py-2.5 my-2"
                        type="submit"
                      >
                        {loading ? <span>Loading...</span> : "Update Credentials"}
                      </Buttons>
                    </form>
                  </AccordionDetails>
                </Accordion>

                {isAdmin && (
                  <Accordion 
                    expanded={openSetting}
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      borderRadius: "12px !important",
                      color: "#e4e4e7",
                      boxShadow: "none",
                      "&:before": { display: "none" }
                    }}
                  >
                    <AccordionSummary
                      onClick={onOpenSettingHandler}
                      expandIcon={<ArrowDropDownIcon sx={{ color: "#10b981" }} />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                      sx={{
                        borderBottom: openSetting ? "1px solid rgba(255, 255, 255, 0.06)" : "none",
                        "& .MuiAccordionSummary-content": { margin: "12px 0" }
                      }}
                    >
                      <h3 className="text-surface-100 text-base font-semibold font-outfit">
                        Account Settings
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: "16px 20px" }}>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-surface-300 font-customWeight text-sm">
                            Account Expired
                          </h3>
                          <Switch
                            checked={accountExpired}
                            onChange={handleAccountExpiryStatus}
                            inputProps={{ "aria-label": "controlled" }}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': { color: '#10b981' },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#10b981' },
                              '& .MuiSwitch-track': { backgroundColor: 'rgba(255,255,255,0.1)' }
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-surface-300 font-customWeight text-sm">
                            Account Locked
                          </h3>
                          <Switch
                            checked={accountLocked}
                            onChange={handleAccountLockStatus}
                            inputProps={{ "aria-label": "controlled" }}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': { color: '#10b981' },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#10b981' },
                              '& .MuiSwitch-track': { backgroundColor: 'rgba(255,255,255,0.1)' }
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-surface-300 font-customWeight text-sm">
                            Account Enabled
                          </h3>
                          <Switch
                            checked={accountEnabled}
                            onChange={handleAccountEnabledStatus}
                            inputProps={{ "aria-label": "controlled" }}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': { color: '#10b981' },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#10b981' },
                              '& .MuiSwitch-track': { backgroundColor: 'rgba(255,255,255,0.1)' }
                            }}
                          />
                        </div>
                        
                        <div className="border-t border-white/[0.06] pt-4">
                          <h3 className="text-surface-300 font-customWeight text-sm mb-2">
                            Credential Expiry Date
                          </h3>
                          <div className="bg-white/[0.02] border border-white/[0.05] px-4 py-3 rounded-lg">
                            <p className="text-surface-300 text-sm">
                              Credentials will expire on: <span className="text-vault-400 font-semibold">{credentialExpireDate}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <h3 className="text-surface-300 font-customWeight text-sm">
                            Credential Expired
                          </h3>
                          <Switch
                            checked={credentialExpired}
                            onChange={handleCredentialExpiredStatus}
                            inputProps={{ "aria-label": "controlled" }}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': { color: '#10b981' },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#10b981' },
                              '& .MuiSwitch-track': { backgroundColor: 'rgba(255,255,255,0.1)' }
                            }}
                          />
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                )}
              </div>

              <div className="border-t border-white/[0.06] pt-6">
                <h3 className="text-surface-100 text-base font-semibold font-outfit mb-3">
                  Last Login Session
                </h3>
                <div className="bg-white/[0.02] border border-white/[0.05] px-4 py-3 rounded-lg">
                  <p className="text-surface-300 text-sm leading-relaxed">
                    Last session initialized:<br />
                    <span className="text-vault-400 font-semibold">{loginSession}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MFA Settings Card */}
          <div className="flex-1 flex flex-col glass-card p-6 border border-white/[0.08] justify-between">
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-surface-100 flex items-center justify-between text-2xl font-bold font-outfit">
                  <span>MFA Authentication</span>
                  <span
                    className={`px-3.5 py-1 text-xs font-semibold rounded-full ${
                      is2faEnabled 
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                  >
                    {is2faEnabled ? "Activated" : "Deactivated"}
                  </span>
                </h1>
                <h3 className="text-surface-200 text-lg font-semibold font-outfit">
                  Multi-Factor Authentication
                </h3>
                <p className="text-surface-400 text-sm leading-relaxed">
                  Two-factor authentication adds an additional layer of security to your account.
                  When active, you will be required to input a 6-digit verification code from an
                  authenticator app during login.
                </p>
              </div>

              <div>
                <Buttons
                  disabled={disabledLoader}
                  onClickhandler={is2faEnabled ? disable2FA : enable2FA}
                  className={is2faEnabled 
                    ? "bg-red-500/10 border border-red-500/20 text-red-400 font-semibold px-5 py-2.5 rounded-lg hover:bg-red-500/20 transition-all duration-300 w-full"
                    : "vault-btn font-semibold text-white px-5 py-2.5 w-full"
                  }
                >
                  {disabledLoader ? (
                    <>Loading...</>
                  ) : (
                    <>
                      {is2faEnabled
                        ? "Disable Two Factor Authentication"
                        : "Enable Two Factor Authentication"}
                    </>
                  )}
                </Buttons>
              </div>

              {step === 2 && (
                <div className="pt-4 animate-slide-up">
                  <Accordion
                    defaultExpanded
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      borderRadius: "12px !important",
                      color: "#e4e4e7",
                      boxShadow: "none",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ArrowDropDownIcon sx={{ color: "#10b981" }} />}
                      aria-controls="panel3-content"
                      id="panel3-header"
                      sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}
                    >
                      <h3 className="font-bold text-sm text-surface-200 font-outfit uppercase tracking-wider">
                        Scan QR Code
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="flex flex-col items-center py-4">
                        <div className="p-3 bg-white rounded-xl mb-6 shadow-glow">
                          <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                        </div>
                        <div className="w-full flex sm:flex-row flex-col items-stretch gap-3">
                          <input
                            type="text"
                            placeholder="Enter 2FA code"
                            value={code}
                            required
                            className="glass-input px-3 py-2 flex-1"
                            onChange={(e) => setCode(e.target.value)}
                          />
                          <button
                            className="vault-btn text-white px-6 py-2 rounded-lg font-semibold whitespace-nowrap"
                            onClick={verify2FA}
                          >
                            {twofaCodeLoader ? "Verifying..." : "Verify Code"}
                          </button>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
