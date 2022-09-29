import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../components/organisms/navbar";
import { Breadcrumb, Col, Row } from "react-bootstrap";
import Link from "next/link";
import { BiSave } from "react-icons/bi";
import Swal from "sweetalert2";

function EditJenis() {
  const router = useRouter();
  const { jenis } = router.query;
  const [datajenis, setDataJenis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [nama, setNama] = useState("");

  useEffect(() => {
    getJenis();
  }, [jenis]);

  const getJenis = () => {
    axios
      .post("/api/jenisById", { id_jenis: jenis })
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
      .patch("/api/editJenis", {
        id_jenis: jenis,
        nama_jenis: nama,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Succseed",
          text: "Berhasil Edit Jenis",
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
      {datajenis.map((item) => (
        <>
          <Head>
            <title>Edit: {item.nama_jenis} </title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
          <Navbar />
          <div className="container mt-4">
            <Breadcrumb>
              <Link href="/" passHref>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
              </Link>
              <Breadcrumb.Item active>Edit: {item.nama_jenis}</Breadcrumb.Item>
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
                    <label for="namaJenis" className="form-label">
                      Nama Jenis
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="namaJenis"
                      placeholder="Nama Jenis"
                      defaultValue={item.nama_jenis}
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
              </Col>
            </Row>
          </div>
        </>
      ))}
    </>
  );
}

export default EditJenis;
