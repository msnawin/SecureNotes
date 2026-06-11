import React from "react";

const ContactPage = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-74px)] relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-vault-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="glass-card p-8 max-w-md w-full mx-4 text-center relative z-10 animate-fade-in">
        <h1 className="text-3xl font-bold mb-4 text-surface-100 font-outfit">Contact Us</h1>
        <p className="text-surface-400 mb-6">
          We'd love to hear from you! If you have any questions or feedback,
          feel free to reach out to us.
        </p>
        <form onSubmit={onSubmitHandler} className="space-y-4 text-left">
          <div>
            <label
              className="block text-surface-300 mb-2 text-sm font-medium"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2.5 glass-input"
            />
          </div>
          <div>
            <label
              className="block text-surface-300 mb-2 text-sm font-medium"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2.5 glass-input"
            />
          </div>
          <div>
            <label
              className="block text-surface-300 mb-2 text-sm font-medium"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2.5 glass-input resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="vault-btn w-full px-4 py-2.5 text-white"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
