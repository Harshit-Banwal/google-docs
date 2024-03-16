const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://harshitbanwal849:jvLNCKw83Xv7cAci@cluster0.nekrntp.mongodb.net/google-docs-app?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));
