import axios from "axios";

export default function handler(req, res) {
  const { id_jenis } = req.body;

  axios
    .post(`${process.env.BASE_URL}/jenis/id`, { id_jenis })
    .then((response) => {
        res.status(200).json(response?.data)
    })
    .catch((error) => {
      res.status(400).json({ message: error?.response?.data?.message });
    });
}