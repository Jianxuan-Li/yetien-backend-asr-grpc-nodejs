import axios from "axios";

export async function post(file, filename, server) {
  try {
    const form = new FormData();
    form.append("audio_file", file, filename);

    const resp = await axios.post(server.url, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        "accept": "application/json",
      },
      auth: {
        username: server.user,
        password: server.pwd,
      },
    });

    if (resp.status === 200) {
      return resp;
    }
  } catch (err) {
    return new Error(err.message);
  }
}
