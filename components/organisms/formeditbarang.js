import React, { useState, useEffect } from "react";
import { BiSave } from "react-icons/bi";

function Formeditbarang(props) {
    const [nama, setNama] = useState("");
    const [stok, setStok] = useState("");
    const [jenis_barang, setJenis] = useState("");


    const handleSubmit = () => {
        setIsLoading(true);
        axios
          .patch("/api/editBarang", {
            id_barang: barang,
            nama_barang: nama,
            stok,
            jenis_barang,
          })
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Succseed",
              text: "Berhasil Tambah barang",
            }).then((result) => (result.isConfirmed ? router.replace("/") : null));
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err?.response?.data?.message,
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      };
  return (
    
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
          value={props.data.nama_barang}
          onChange={(e) => setNama(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label for="StokBarang" className="form-label">
          Stok barang
        </label>
        <input
          type="number"
          value={props.data.stok}
          className="form-control"
          id="StokBarang"
          placeholder="Stok barang"
          onChange={(e) => setStok(e.target.value)}
        />
      </div>
      {/* <div className="mb-3">
        <label for="jenisBarang" className="form-label">
          Jenis barang
        </label>
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={(e) => setJenis(e.target.value)}
        >
          {datajenis.map((jenis) => (
            <>
              {item.jenis_barang == jenis.id_jenis ? (
                <>
                  <option selected value={item.jenis_barang}>
                    {jenis.nama_jenis}
                  </option>
                </>
              ) : (
                <>
                  <option value={jenis.id_jenis}>{jenis.nama_jenis}</option>
                </>
              )}
            </>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? (
          "Menyimpan..."
        ) : (
          <>
            <BiSave /> Simpan
          </>
        )}
      </button> */}
    </form>
  );
}

export default Formeditbarang;
