import { useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

function TambahBarang(props) {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [stok, setStok] = useState("");
  const [jenis, setJenis] = useState("");
  const [datajenis, setDataJenis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      .post("/api/simpanBarang", { nama_barang: nama, stok, jenis })
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
        props.tutup();
        props.ubahState();
      });
  };

  return (
    <>
      <div className="container">
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
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="StokBarang" className="form-label">
              Stok barang
            </label>
            <input
              type="number"
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
              <option selected value={null}>
                --Jenis--
              </option>
              {datajenis.map((item) => (
                <>
                  <option value={item.id_jenis}>{item.nama_jenis}</option>
                </>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              "Menyimpan..."
            ) : (
              <>
                <BiSave /> Simpan
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
}

export default TambahBarang;
