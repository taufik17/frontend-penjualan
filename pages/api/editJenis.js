import axios from "axios";

export default function handler(req, res) {
  const { id_jenis, nama_jenis } = req.body;

  axios
    .patch(`${process.env.NEXT_PUBLIC_BASE_URL}/jenis/edit`, {
      id_jenis,
      nama_jenis,
    })
    .then((response) => {
      res.status(200).json(response?.data);
    })
    .catch((error) => {
      res.status(400).json({ message: error?.response?.data?.message });
    });
}
