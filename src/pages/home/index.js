import { getTaoSeats, login } from '../../utils/api';

login({
    username: '',
    password: ''
}).then((response) => {
    console.log(response);
}).catch((err) => {
    console.log(err);
})