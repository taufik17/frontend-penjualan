import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../components/organisms/navbar";
import { Table, Breadcrumb, Modal, Button } from "react-bootstrap";
import { BiEdit, BiTrash, BiPlusCircle } from "react-icons/bi";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import TambahBarang from "./tambahBarang";
import Tes from "./tes";

export default function Home() {
  const router = useRouter();
  const [state, setState] = useState(0);
  const [barang, setBarang] = useState([]);
  const [jenis, setJenis] = useState([]);
  const [transaksi, setTransaksi] = useState([]);

  const [awalTinggi, setAwalTertinggi] = useState(null);
  const [akhirTinggi, setAkhirTertinggi] = useState(null);
  const [hasilTertinggi, setHasilTertinggi] = useState(null);

  const [awalRendah, setAwalTerRendah] = useState(null);
  const [akhirRendah, setAkhirTerRendah] = useState(null);
  const [hasilTerendah, setHasilTerendah] = useState(null);

  const [message, setMessage] = useState("");

  // 👇️ called every time input's value changes
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const [showTambahBarang, setShowTambahBarang] = useState(false);

  const handleCloseTambahBarang = () => setShowTambahBarang(false);
  const handleShowTambahBarang = () => setShowTambahBarang(true);

  const [showEditBarang, setShowEditBarang] = useState(false);
  const [dataEditBarang, setDataEditBarang] = useState([]);

  const handleCloseEditBarang = () => setShowEditBarang(false);
  const handleShowEditBarang = (id_barang) => {
    setShowEditBarang(true);
    axios
      .post("/api/barangById", { id_barang })
      .then((res) => {
        setDataEditBarang(res?.data?.data);
        setMessage(res?.data?.data[0]?.nama_barang);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [nama, setNama] = useState("");
  const [stok, setStok] = useState("");
  const [jenis_barang, setJenisBarang] = useState("");

  const handleState = () => setState(state + 1);

  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    axios
      .post("/api/searchTransaksi", { keyword })
      .then((res) => {
        setTransaksi(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTertinggi = () => {
    axios
      .post("/api/transaksiTinggi", { awal: awalTinggi, akhir: akhirTinggi })
      .then((res) => {
        setHasilTertinggi(res?.data?.data.slice(0, 1));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTerendah = () => {
    axios
      .post("/api/transaksiRendah", { awal: awalRendah, akhir: akhirRendah })
      .then((res) => {
        setHasilTerendah(res?.data?.data.slice(0, 1));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBarang();
    getJenis();
    getTransaksi();
  }, [state]);

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

  const getJenis = () => {
    axios
      .get("/api/jenis")
      .then((res) => {
        setJenis(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTransaksi = () => {
    axios
      .get("/api/transaksi")
      .then((res) => {
        setTransaksi(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteBarang = (name, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("api/deleteBarang", { id })
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Succseed",
              text: "Berhasil Hapus barang",
            }).then((result) => {
              setState(state + 1);
              setTimeout(() => {
                router.replace("/");
              }, 1800);
            });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err?.response?.data?.message,
            });
          })
          .finally(() => {
            setState(state + 1);
          });
      }
    });
  };

  const handleDeleteJenis = (name, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("api/deleteJenis", { id })
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Succseed",
              text: "Berhasil Hapus Jenis",
            }).then((result) => {
              setState(state + 1);
              result.isConfirmed ? router.replace("/") : null;
            });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err?.response?.data?.message,
            });
          })
          .finally(() => {
            setState(state + 1);
          });
      }
    });
  };

  return (
    <>
      <Head>
        <title>Data Penjualan</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="container mt-4">
        <Breadcrumb>
          <Breadcrumb.Item active>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div className="row">
          <div className="col-8">
            <h5>Barang</h5>
            <Button
              variant="primary"
              className="mb-3"
              onClick={handleShowTambahBarang}
            >
              <BiPlusCircle /> Tambah Barang
            </Button>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Barang</th>
                  <th>Stok</th>
                  <th>Jenis Barang</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {barang.map((item, index) => (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.nama_barang}</td>
                      <td>{item.stok}</td>
                      <td>{item.nama_jenis}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-danger btn-sm mx-1"
                          onClick={(e) => {
                            handleDeleteBarang(
                              item.nama_barang,
                              item.id_barang
                            );
                          }}
                        >
                          <BiTrash />
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm mx-1"
                          onClick={(e) => {
                            handleShowEditBarang(item.id_barang);
                          }}
                        >
                          <BiEdit />
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="col-4">
            <h5>Jenis</h5>
            <Link href="/tambahJenis" passHref>
              <button type="button" class="btn btn-primary mb-2">
                <BiPlusCircle /> Tambah Jenis barang
              </button>
            </Link>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Jenis</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {jenis.map((item, index) => (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.nama_jenis}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-danger btn-sm mx-1"
                          onClick={(e) => {
                            handleDeleteJenis(item.nama_jenis, item.id_jenis);
                          }}
                        >
                          <BiTrash />
                        </button>
                        <Link href={"/editJenis/" + item.id_jenis} passHref>
                          <button
                            type="button"
                            className="btn btn-warning btn-sm mx-1"
                            onClick={(e) => {
                              handleDeleteJenis(item.nama_jenis, item.id_jenis);
                            }}
                          >
                            <BiEdit />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="row my-4 justify-content-center">
          <div className="col">
            <h5>Transaksi</h5>
            <div className="row my-3">
              <div className="col">
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
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama barang</th>
                  <th>Jenis Barang</th>
                  <th>Jumlah</th>
                  <th>Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {transaksi.map((item, index) => (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.nama_barang}</td>
                      <td>{item.nama_jenis}</td>
                      <td>{item.jumlah}</td>
                      <td>{moment(item.tgl_transaksi).format("ll")}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="row my-4">
          <div className="col-6">
            <div className="card">
              <div className="card-header">
                <h6>Transaksi Tertinggi</h6>
              </div>
              <div className="card-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleTertinggi();
                  }}
                >
                  <div className="d-flex justify-content-between my-2">
                    <input
                      type="date"
                      onChange={(e) => setAwalTertinggi(e.target.value)}
                    />
                    <p>sampai</p>
                    <input
                      type="date"
                      onChange={(e) => setAkhirTertinggi(e.target.value)}
                    />
                  </div>
                  <button type="submit" class="btn btn-primary mb-2">
                    cari
                  </button>
                </form>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>
                        {hasilTertinggi ? (
                          <>
                            {hasilTertinggi.map((item, index) => (
                              <>
                                {item.nama_jenis} {item.jumlah} Transaksi
                              </>
                            ))}
                          </>
                        ) : (
                          <></>
                        )}
                      </th>
                    </tr>
                  </thead>
                </Table>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-header">
                <h6>Transaksi Terendah</h6>
              </div>
              <div className="card-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleTerendah();
                  }}
                >
                  <div className="d-flex justify-content-between my-2">
                    <input
                      type="date"
                      onChange={(e) => setAwalTerRendah(e.target.value)}
                    />
                    <p>sampai</p>
                    <input
                      type="date"
                      onChange={(e) => setAkhirTerRendah(e.target.value)}
                    />
                  </div>
                  <button type="submit" class="btn btn-primary mb-2">
                    cari
                  </button>
                </form>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>
                        {hasilTerendah ? (
                          <>
                            {hasilTerendah.map((item, index) => (
                              <>
                                {item.nama_jenis} {item.jumlah} Transaksi
                              </>
                            ))}
                          </>
                        ) : (
                          <></>
                        )}
                      </th>
                    </tr>
                  </thead>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showTambahBarang}
        onHide={handleCloseTambahBarang}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TambahBarang
            tutup={handleCloseTambahBarang}
            ubahState={handleState}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={showEditBarang}
        onHide={handleCloseEditBarang}
        backdrop="static"
        keyboard={false}
      >
        {dataEditBarang.map((item) => (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Edit {item.nama_barang}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
              <input
                id="message"
                name="message"
                type="text"
                className="form-control"
                onChange={handleChange}
                value={message}
              />
            </Modal.Body>
          </>
        ))}
      </Modal>
    </>
  );
}
