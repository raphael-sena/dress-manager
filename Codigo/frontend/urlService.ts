const urlApi = process.env.NEXT_PUBLIC_API_URL;

if (!urlApi) {
  throw new Error("A variável NEXT_PUBLIC_API_URL não foi definida no ambiente.");
}

export default urlApi;