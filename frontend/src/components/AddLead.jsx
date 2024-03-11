function AddLeads({ setIsModalOpen }) {
  return (
    <div className="flex justify-around px-10">
      <img
        className="rounded-full h-16 w-16"
        src="https://picsum.photos/200"
        alt="Image"
      ></img>
      <input
        onClick={() => {
          setIsModalOpen(true);
          //   console.log("something");
        }}
        className="bg-gray-500 p-4 mx-4 rounded-full w-full"
        placeholder="Click here to add leads"
      ></input>
    </div>
  );
}

export default AddLeads;
