const InputField = ({
  label,
  id,
  type,
  errors,
  register,
  required,
  message,
  className,
  min,
  value,
  autoFocus,
  placeholder,
  readOnly,
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className={`font-semibold text-sm text-surface-300 font-outfit`}>
        {label}
      </label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`glass-input px-3 py-2 ${
          autoFocus ? "ring-2 ring-vault-500/30" : ""
        } ${
          errors[id]?.message ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : ""
        } ${readOnly ? "opacity-60 cursor-not-allowed bg-white/[0.02]" : ""}`}
        {...register(id, {
          required: { value: required, message },
          minLength: min
            ? { value: min, message: "Minimum 6 character is required" }
            : null,
        })}
        readOnly={readOnly}
      />

      {errors[id]?.message && (
        <p className="text-xs font-semibold text-red-400 mt-0.5">
          {errors[id]?.message}*
        </p>
      )}
    </div>
  );
};

export default InputField;
