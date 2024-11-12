const express = require('express');
const fileUpload = require('express-fileupload');
const videoRoutes = require('./routes/videoRoutes');

const app = express();

app.use(express.json());
app.use(fileUpload({ createParentPath: true }));

app.use('/api/video', videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
