import { app } from "./app.js";

const PORT = process.env.BACKEND_PORT || 3000;

app.listen(PORT, ()=>{
  console.log(`Server is listening on port: ${PORT}`);
});
