import axios from "axios";

export default function handler(req, res) {
  const { awal, akhir } = req.body;

  axios
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}/transaksi/terendah`, { awal, akhir })
    .then((response) => {
        res.status(200).json(response?.data)
    })
    .catch((error) => {
      res.status(400).json({ message: error?.response?.data?.message });
    });
}