export default class {
  constructor(type, collection, db) {
    this.type = type;
    this.collection = collection;
    this.db = db;
  }

  _getFilterFns(filters) {
    return Object.entries(filters).map(([name, value]) => {
      const fn = this[name];

      return typeof fn === "function"
        ? records => fn.call(this, records, value)
        : records => records;
    });
  }

  filter(records, filters) {
    return this._getFilterFns(filters).reduce((recs, fn) => fn(recs), records);
  }

  find(records, filters) {
    return (
      this._getFilterFns(filters).reduce((recs, fn) => fn(recs), records)[0] ||
      null
    );
  }

  slug(records, value) {
    return records.filter(({ slug }) => slug === value);
  }
}
