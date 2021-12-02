import app from './server';
import './db/connection';

console.clear();

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
