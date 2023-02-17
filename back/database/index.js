const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://strazza:2sHPk5Sdi2k9k76e@cluster0.wyh8dkz.mongodb.net/supaKanban?retryWrites=true&w=majority').then(() => {
    console.log('Connexion DB OK');
}).catch((e) => {
    console.log('Connexion KO', e);
})