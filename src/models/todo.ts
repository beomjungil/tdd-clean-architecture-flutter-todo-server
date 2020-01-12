import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        isFinished: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

todoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (_, ret) { delete ret._id }
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
