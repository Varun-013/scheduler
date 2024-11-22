// UserProfileModal.jsx
"use client";
import React from "react";
import Dialog from "@/components/ui/Dialog"; // Assuming you have a dialog component
import { Button } from "@/components/ui/button";

function UserProfileModal({ isOpen, onClose, userInfo }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay />
      <Dialog.Content>
        <Dialog.Title>User Profile</Dialog.Title>
        <Dialog.Description>
          <div className="flex flex-col">
            <p><strong>Name:</strong> {userInfo?.name}</p>
            <p><strong>Email:</strong> {userInfo?.email}</p>
            <p><strong>No. of Meetings Scheduled:</strong> {userInfo?.scheduledMeetings}</p>
            <p><strong>No. of Meetings Completed:</strong> {userInfo?.completedMeetings}</p>
          </div>
        </Dialog.Description>
        <Button onClick={onClose}>Close</Button>
      </Dialog.Content>
    </Dialog>
  );
}

export default UserProfileModal;
