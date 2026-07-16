const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/contact-manager', {
      serverSelectionTimeoutMS: 5000,
      family: 4,
    });

    console.log('connected', mongoose.connection.readyState);

    const schema = new mongoose.Schema({ name: String, email: String, phone: String });
    const Contact = mongoose.model('Contact', schema, 'contacts');

    const doc = await Contact.create({ name: 'Direct Test', email: 'direct@example.com', phone: '111' });
    console.log(JSON.stringify(doc.toObject()));

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
