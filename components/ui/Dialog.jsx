// /components/ui/Dialog.jsx
"use client";
import React from "react";

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onOpenChange} />
      <div className="bg-white rounded-lg shadow-lg p-6 z-10">
        {children}
      </div>
    </div>
  );
};

Dialog.Title = ({ children }) => <h2 className="text-lg font-bold">{children}</h2>;
Dialog.Description = ({ children }) => <div>{children}</div>;
Dialog.Overlay = () => null; // Optional, for styling overlay
Dialog.Content = ({ children }) => <div>{children}</div>;

export default Dialog;
