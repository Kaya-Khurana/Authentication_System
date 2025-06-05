export default function UserProfile({ params }: any) {
  return (
    <>
      <h1>
        {" "}
        Profile Page
        <br />
        <span>{params.id}</span>
      </h1>
    </>
  );
}
