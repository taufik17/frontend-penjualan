import axios from "axios";

export default function handler(req, res) {
  const { id } = req.body;

  axios
    .delete(`${process.env.BASE_URL}/barang/delete`, {
      data: {
        id_barang: id,
      },
    })
    .then((response) => {
      res.status(200).json(response?.data);
    })
    .catch((error) => {
      res.status(400).json({ message: error?.response?.data?.message });
    });
}
