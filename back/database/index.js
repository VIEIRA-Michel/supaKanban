const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

exports.clientPromise = mongoose.connect(
    'mongodb+srv://strazza:2sHPk5Sdi2k9k76e@cluster0.wyh8dkz.mongodb.net/supaKanban?retryWrites=true&w=majority'
);
