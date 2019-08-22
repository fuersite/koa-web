const schema = {
    _id: String,
    data: Object,
    updatedAt: {
        default: new Date(),
        type: Date
    }
};
class MongooseStore {
    constructor ({collection = 'sessions', connection = null} = {}) {
        if (!connection) {
            throw new Error('params connection is not collection');
        }
        const { Schema } = connection;
        this.session = connection.model(collection, new Schema(schema));
    }

    async destroy (id) {
        const { session } = this;
        return session.remove({ _id: id });
    }

    async get (id) {
        const { session } = this;
        const { data } = await session.findById(id);
        return data;
    }

    async set (id, data, maxAge, { changed, rolling }) {
        if (changed || rolling) {
            const { session } = this;
            const record = { _id: id, data, updatedAt: new Date() };
            await session.findByIdAndUpdate(id, record, { upsert: true, safe: true });
        }
        return data;
    }

    static create (opts) {
        return new MongooseStore(opts);
    }
}

module.exports = MongooseStore