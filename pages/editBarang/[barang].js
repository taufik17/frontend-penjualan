import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../components/organisms/navbar";
import { Breadcrumb, Col, Row } from "react-bootstrap";
import Link from "next/link";
import { BiSave } from "react-icons/bi";
import Swal from "sweetalert2";

function EditBarang() {
  const router = useRouter();
  const { barang } = router.query;
  const [dataBarang, setDataBarang] = useState([]);
  const [datajenis, setDataJenis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [nama, setNama] = useState("");
  const [stok, setStok] = useState("");
  const [jenis_barang, setJenis] = useState("");

  useEffect(() => {
    getBarang();
    getJenis();
  }, [barang]);

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

  const getBarang = () => {
    axios
      .post("/api/barangById", { id_barang: barang })
      .then((res) => {
        setDataBarang(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .patch("/api/editBarang", { id_barang: barang, nama_barang: nama, stok, jenis_barang })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Succseed",
          text: "Berhasil Edit barang",
        })
          .then((result) => (result.isConfirmed ? router.replace("/") : null));
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
      {dataBarang.map((item) => (
        <>
          <Head>
            <title>Edit: {item.nama_barang} </title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
          <Navbar />
          <div className="container mt-4">
            <Breadcrumb>
              <Link href="/" passHref>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
              </Link>
              <Breadcrumb.Item active>Edit: {item.nama_barang}</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
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
                      defaultValue={item.nama_barang}
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="StokBarang" className="form-label">
                      Stok barang
                    </label>
                    <input
                      type="number"
                      defaultValue={item.stok}
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
                          {item.jenis_barang == jenis.id_jenis ? (
                            <>
                              <option selected value={item.jenis_barang}>
                                {jenis.nama_jenis}
                              </option>
                            </>
                          ) : (
                            <>
                              <option value={jenis.id_jenis}>
                                {jenis.nama_jenis}
                              </option>
                            </>
                          )}
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
              </Col>
            </Row>
          </div>
        </>
      ))}
    </>
  );
}

export default EditBarang;
