import { useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

function TambahJenis(props) {
  const router = useRouter();
  const [nama_jenis, setNama] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .post("/api/simpanJenis", { nama_jenis })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Succseed",
          text: "Berhasil Tambah Jenis",
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
            <label for="namaJenisBarang" className="form-label">
              Nama Jenis
            </label>
            <input
              type="text"
              className="form-control"
              id="namaJenisBarang"
              placeholder="Nama Jenis"
              onChange={(e) => setNama(e.target.value)}
            />
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

export default TambahJenis;
