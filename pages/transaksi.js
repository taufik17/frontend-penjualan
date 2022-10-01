import Head from "next/head";
import React, { useState, useEffect } from "react";
import Navbar from "../components/organisms/navbar";
import { Breadcrumb, Button } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

function Transaksi(props) {
  const router = useRouter();
  const [barang, setBarang] = useState([]);
  const [keranjang, setKeranjang] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    axios
      .post("/api/searchBarang", { keyword })
      .then((res) => {
        setBarang(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdd = (data) => {
    if (keranjang.length > 0) {
      const found = keranjang.filter((x) => x.id_barang === data.id_barang);
      if (found.length > 0) {
        const newState = keranjang.map((obj) => {
          if (obj.id_barang === data.id_barang) {
            return { ...obj, jumlah: obj.jumlah + 1 };
          }
          return obj;
        });

        setKeranjang(newState);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: `${data.nama_barang} Sukses Masuk keranjang`,
        });
      } else {
        const obj = {
          id_barang: data.id_barang,
          jumlah: 1,
          nama_barang: data.nama_barang,
          tgl_transaksi: moment().format(),
        };
        setKeranjang((current) => [...current, obj]);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: `${data.nama_barang} Sukses Masuk keranjang`,
        });
      }
    } else {
      const obj = {
        id_barang: data.id_barang,
        jumlah: 1,
        nama_barang: data.nama_barang,
        tgl_transaksi: moment().format(),
      };
      setKeranjang((current) => [...current, obj]);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: `${data.nama_barang} Sukses Masuk keranjang`,
      });
    }
  };

  useEffect(() => {
    getBarang();
  }, []);

  const getBarang = () => {
    axios
      .get("/api/barang")
      .then((res) => {
        setBarang(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const processTransaksi = () => {
    setIsLoading(true);
    axios
      .post("/api/simpanTransaksi", { data: JSON.stringify(keranjang) })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Succseed",
          text: "Transaksi Berhasil",
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

  console.log(keranjang);

  return (
    <>
      
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className="card">
              <div className="card-header">
                <h6>Data barang</h6>
              </div>
              <div className="card-body">
                <div className="mb-4 mx-3">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSearch();
                    }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </form>
                </div>
                {barang.map((item) => (
                  <>
                    <button
                      type="button"
                      class="btn btn-secondary position-relative mx-3 my-2"
                      onClick={() => {
                        handleAdd(item);
                      }}
                    >
                      {item.nama_barang}
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {item.stok}
                      </span>
                    </button>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card">
              <div className="card-header">
                <h6>Keranjang</h6>
              </div>
              <div className="card-body">
                <ol className="list-group list-group-numbered">
                  {keranjang.map((item) => (
                    <>
                      <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{item.nama_barang}</div>
                        </div>
                        <span className="badge bg-primary rounded-pill">
                          {item.jumlah}
                        </span>
                      </li>
                    </>
                  ))}
                </ol>
                {keranjang.length > 0 ? (
                  <>
                    <div className="d-grid gap-2 my-3">
                      <button
                        type="button"
                        className="btn btn-primary"
                        disabled={isLoading}
                        onClick={processTransaksi}
                      >
                        {isLoading ? "Memproses..." : <>Proses Transaksi</>}
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Transaksi;
