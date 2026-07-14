import React from "react";

function PhoneFrame({ children, className = "", screenRef, label }) {
  return (
    <div className={`phone-frame phone-frame-s24-plus ${className}`.trim()} aria-label={label}>
      <div className="phone-frame-hardware" aria-hidden="true">
        <span className="phone-frame-camera" />
        <span className="phone-frame-speaker" />
      </div>
      <span className="phone-frame-volume" aria-hidden="true" />
      <span className="phone-frame-power" aria-hidden="true" />
      <div className="phone-frame-screen" ref={screenRef}>
        {children}
      </div>
    </div>
  );
}

export default PhoneFrame;
