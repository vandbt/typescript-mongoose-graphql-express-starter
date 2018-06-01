// Section CRUD Repository
import mongoose from "mongoose";

export interface IRead<T> {
  retrieve: (callback?: (error: any, result: any) => void) => void;
  findById: (id: string, callback?: (error: any, result: T) => void) => void;
  findOne(cond?: Object, callback?: (err: any, res: T) => void): mongoose.Query<T>;
  find(cond: Object, fields: Object, options: Object, callback?: (err: any, res: T[]) => void): mongoose.Query<T[]>;
}

export interface IWrite<T> {
  create: (item: T, callback?: (error: any, result: any) => void) => void;
  update: (_id: mongoose.Types.ObjectId, item: T, callback?: (error: any, result: any) => void) => void;
  delete: (_id: string, callback?: (error: any, result: any) => void) => void;
}

export class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

  private _model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this._model = schemaModel;
  }

  static getInstance() {
    throw "Not implemented, Sub Class should implement this.";
  }

  create(item: T, callback?: (error: any, result: T) => void) {
    if (callback) {
        this._model.create(item, callback);
    } else {
      this._model.create(item).then((res)=>{
        return res;
      });
    }
  }

  retrieve(callback?: (error: any, result: T) => void) {
    this._model.find({}, callback);
  }

  update(_id: mongoose.Types.ObjectId, item: T, callback?: (error: any, result: any) => void) {
    var q = this._model.update({ _id: _id }, item);
      if (callback) {
        q.exec(callback);
      } else {
        q.exec((err, res)=>{
          return res;
        });
      }
  }

  delete(_id: string, callback?: (error: any, result: any) => void) {
    var q = this._model.remove({ _id: this.toObjectId(_id) })
      if (callback) {
        q.exec(callback);
      } else {
        q.exec((err, res)=>{
          return res;
        });
      }
  }

  findById(_id: string, callback?: (error: any, result: T) => void) {
    var q = this._model.findById(_id)
      if (callback) {
        q.exec(callback);
      } else {
        q.exec((err, res)=>{
          return res;
        });
      }
  }

  findOne(cond?: Object, callback?: (err: any, res: T) => void): mongoose.Query<T> | any {
      var q = this._model.findOne(cond)
      if (callback) {
        q.exec(callback);
      } else {
        q.exec((err, res)=>{
          return res;
        });
      }
    }
  
    find(cond?: Object, fields?: Object, options?: Object, callback?: (err: any, res: T[]) => void): mongoose.Query<T[]> | any {
      var q = this._model.find(cond, options)
      if (callback) {
        q.exec(callback);
      } else {
        q.exec((err, res)=>{
          return res;
        });
      }
    }

  private toObjectId(_id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(_id);
  }

}
