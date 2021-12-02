import app from './app';

console.clear();

import './db';

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
