# guerrillamail
JavaScript library for guerrillamail.com
# main
```js
const {guerrillamail} = require('./guerrillamail');

const mail = new guerrillamail();
mail.get_email().then(info => {
    console.log(info);
}).catch(error => {
    console.error('Error:', error);
});
```
