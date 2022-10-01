import axios from "axios";

export default function handler(req, res) {
  const { id_barang } = req.body;

  axios
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}/barang/id`, { id_barang })
    .then((response) => {
        res.status(200).json(response?.data)
    })
    .catch((error) => {
      res.status(400).json({ message: error?.response?.data?.message });
    });
}