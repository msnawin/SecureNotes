import React from "react";
import CardSlider from "./CardSlider";

const State = () => {
  return (
    <div className="py-28">
      <div className="flex justify-between items-center md:px-0 px-4">
        <div className="flex flex-1 flex-col items-center justify-center gap-2 glass-card py-6 mx-2">
          <span className="sm:text-4xl text-logoText text-vault-400 font-bold font-outfit">
            7x
          </span>
          <span className="text-surface-400 text-center sm:text-sm text-xs">
            High Conversion Rate
          </span>
        </div>{" "}
        <div className="flex flex-1 flex-col items-center justify-center gap-2 glass-card py-6 mx-2">
          <span className="sm:text-4xl text-logoText text-vault-400 font-bold font-outfit">
            42x
          </span>
          <span className="text-surface-400 text-center sm:text-sm text-xs">
            Faster Impression
          </span>
        </div>{" "}
        <div className="flex flex-1 flex-col items-center justify-center gap-2 glass-card py-6 mx-2">
          <span className="sm:text-4xl text-logoText text-vault-400 font-bold font-outfit">
            300%
          </span>
          <span className="text-surface-400 text-center sm:text-sm text-xs">
            Higher lead Quality
          </span>
        </div>
      </div>
      <div className="mt-10 md:px-0 px-4">
        <h3 className="text-surface-200 text-2xl font-semibold pb-5 pt-6 font-outfit">
          Metrics For <span className="text-gradient">RookVault Notes</span>
        </h3>

        <div className="flex md:flex-row flex-col md:gap-0 gap-16 justify-between">
          <ul className="list-none sm:px-5 ps-6 text-surface-400 flex flex-col gap-4 flex-1 overflow-hidden">
            <li className="flex items-start gap-2"><span className="text-vault-400">▸</span>Trusted by thousands of users worldwide.</li>
            <li className="flex items-start gap-2"><span className="text-vault-400">▸</span>Experience reliable access to your notes anytime, anywhere.</li>
            <li className="flex items-start gap-2"><span className="text-vault-400">▸</span>Quickly access your notes with our optimized search feature.</li>
            <li className="flex items-start gap-2"><span className="text-vault-400">▸</span>Quickly access your notes with our optimized search feature.</li>
            <li className="flex items-start gap-2"><span className="text-vault-400">▸</span>10,000+ trusted users</li>
            <li className="flex items-start gap-2"><span className="text-vault-400">▸</span>99.9% uptime</li>
            <li className="flex items-start gap-2"><span className="text-vault-400">▸</span>2x faster note retrieval</li>
          </ul>
          <div className="flex-1 overflow-hidden">
            <CardSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default State;
