import app from "./app";
import { connectDB } from "./models/index";

const PORT = Number(process.env.PORT) || 10000;

connectDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
