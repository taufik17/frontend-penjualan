import { useEffect, useState } from "react";

function Tes(props) {
  const [testing, setTaste] = useState("hello");
  const [message, setMessage] = useState(props.testing);

  // 👇️ called every time input's value changes
  const handleChange = event => {
    setMessage(event.target.value);
  };
  console.log("ini messsage", message);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="mb-3">
          <label for="namaBarang" className="form-label">
            Nama barang 
          </label>
          <input
            type="text"
            className="form-control"
            id="namaBarang"
            placeholder="Nama barang"
            value={props.testing}
            onChange={handleChange}
          />
        </div>
      </form>
    </>
  );
}

export default Tes;
