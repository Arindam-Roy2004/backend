import 'dotenv/config'; // Automatically loads environment variables from .env file
import express from 'express';

const app = express();

const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || '127.0.0.1';

// app.get("/", (req, res) => {
//     res.send("Hello, from Arindam!");
// });

// app.get("/about", (req, res) => {
//     res.send("About page");
// });
// app.get("/contact", (req, res) => {
//     res.send("Contact page");
// });
// app.get("/help", (req, res) => {
//     res.send("Help page");
// });

// // 404 Not Found handler
// app.use((req, res) => {
//     res.status(404).send("Page not found");
// });

app.use(express.json());

let data = []
let nextId = 1;

app.post('/data',(req, res) => {
    const {name,price}=req.body;
    const newData = {
        id: nextId++,
        name,
        price
    };
    data.push(newData);
    res.status(201).json(newData);
});

app.get('/cars', (req, res) => {
    res.status(200).send(data);
});

app.get('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const car = data.find(c => c.id === id);
    if (!car) {
        return res.status(404).send('Car not found');
    }
    res.status(200).send(car);
});

app.put('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const car = data.find(c => c.id === id);
    if (!car) {
        return res.status(404).send('Car not found');
    }
    const { name, price } = req.body;
    car.name = name;
    car.price = price;
    return res.status(200).send(car);
});

app.delete('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = data.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).send('Car not found');
    }
    data.splice(index, 1);
    return res.status(204).send('Car deleted successfully');
});




app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});

