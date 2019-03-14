import { getPopRecipes } from '../../utils/api';

getPopRecipes().then((result) => {
    document.write(JSON.stringify(result.data));
}).catch((err) => {
    console.log(err);
})