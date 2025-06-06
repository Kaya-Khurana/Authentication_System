import React from "react";

export default function UserProfile({ params }: { params: { id: string } }) {
  return (
    <>
      <h1>
        Profile Page
        <br />
        <span>{params.id}</span>
      </h1>
    </>
  );
}
