const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
}, { timestamps: true });

bookSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});


module.exports = mongoose.model('Book', bookSchema);