const express = require('express');
const cors = require('cors');
const app = express();
const exerciseController = require('./controllers/exercise');
const workoutController = require('./controllers/workout');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/lifty/exercise', exerciseController);
app.use('/lifty/workout', workoutController);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
