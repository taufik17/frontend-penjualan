import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../components/organisms/navbar";
import { Table, Breadcrumb } from "react-bootstrap";
import { BiEdit, BiTrash, BiPlusCircle } from "react-icons/bi";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [state, setState] = useState(0);
  const [barang, setBarang] = useState([]);
  const [jenis, setJenis] = useState([]);
  const [transaksi, setTransaksi] = useState([]);

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
              text: "Berhasil Tambah barang",
            }).then((result) => {
              setState(+1);
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
            setState(+1);
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
            <Link href="/tambahBarang" passHref>
              <button type="button" class="btn btn-primary mb-2">
                <BiPlusCircle /> Tambah Barang
              </button>
            </Link>
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
                          class="btn btn-warning btn-sm mx-1"
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
            <button type="button" class="btn btn-primary mb-2">
              <BiPlusCircle /> Tambah Jenis barang
            </button>
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
                        >
                          <BiTrash />
                        </button>
                        <button
                          type="button"
                          class="btn btn-warning btn-sm mx-1"
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
        </div>
        <div className="row my-4 justify-content-center">
          <div className="col">
            <h5>Transaksi</h5>
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
      </div>
    </>
  );
}
