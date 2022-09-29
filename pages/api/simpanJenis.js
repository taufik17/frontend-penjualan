import axios from "axios";

export default function handler(req, res) {
  const { nama_jenis } = req.body;

  axios
    .post(`${process.env.BASE_URL}/jenis/tambah`, { nama_jenis })
    .then((response) => {
        res.status(200).json(response?.data)
    })
    .catch((error) => {
      res.status(400).json({ message: error?.response?.data?.message });
    });
}
