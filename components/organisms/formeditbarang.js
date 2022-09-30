import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { BiSave } from "react-icons/bi";
import Swal from "sweetalert2";

function EditBarang(props) {
  console.log(props?.data[0])
  const router = useRouter();
  const [datajenis, setDataJenis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [nama, setNama] = useState(props?.data[0]?.nama_barang);
  const [stok, setStok] = useState(props?.data[0]?.stok);
  const [jenis_barang, setJenis] = useState(props?.data[0]?.jenis_barang);

  useEffect(() => {
    getJenis();
  }, []);

  const getJenis = () => {
    axios
      .get("/api/jenis")
      .then((res) => {
        setDataJenis(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          text: "Berhasil Edit barang",
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
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="mb-3">
          <label for="namaBarang" className="form-label">
            Nama barang {nama}
          </label>
          <input
            type="text"
            className="form-control"
            id="namaBarang"
            placeholder="Nama barang"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="StokBarang" className="form-label">
            Stok barang
          </label>
          <input
            type="number"
            defaultValue={stok}
            className="form-control"
            id="StokBarang"
            placeholder="Stok barang"
            onChange={(e) => setStok(e.target.value)}
          />
        </div>
        <div className="mb-3">
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
                {jenis_barang == jenis.id_jenis ? (
                  <>
                    <option selected value={jenis_barang}>
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
        </button>
      </form>
    </>
  );
}

export default EditBarang;
