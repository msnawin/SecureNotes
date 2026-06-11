import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-[calc(100vh-74px)]">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center animate-fade-in">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-gradient font-outfit">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-surface-100 md:text-4xl font-outfit">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-surface-400">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <Link
            to="/"
            className="inline-flex vault-btn font-medium text-sm px-6 py-2.5 text-center text-white my-4"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
