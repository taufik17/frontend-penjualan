import axios from "axios";

export default function handler(req, res) {
  const { id_barang, nama_barang, stok, jenis_barang } = req.body;

  axios
    .patch(`${process.env.NEXT_PUBLIC_BASE_URL}/barang/edit`, {
      id_barang,
      nama_barang,
      stok,
      jenis_barang,
    })
    .then((response) => {
      res.status(200).json(response?.data);
    })
    .catch((error) => {
      res.status(400).json({ message: error?.response?.data?.message });
    });
}
