const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://strazza:Km3*UaQ28XA39qF@cluster0.wyh8dkz.mongodb.net/supaKanban?retryWrites=true&w=majority').then(() => {
    console.log('Connexion DB OK');
}).catch((e) => {
    console.log('Connexion KO', e);
})