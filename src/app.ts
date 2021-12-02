import { app } from './models';
import './db/db';

console.clear();

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
