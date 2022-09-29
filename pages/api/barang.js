import axios from "axios";

export default function handler(req, res) {
  axios
    .get(`${process.env.BASE_URL}/barang`)
    .then((response) => {
      res.status(200).json(response?.data);
    })
    .catch((error) => {
      res.status(400).json({ message: error?.response?.data?.message });
    });
}
