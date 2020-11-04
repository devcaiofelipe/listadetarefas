import { DataTypes, Model } from 'sequelize';


export default class Task extends Model{
  static init(connection) {
    super.init({
      task: {
        type: DataTypes.STRING,
      },
      done: {
        type: DataTypes.BOOLEAN,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      date: {
        type: DataTypes.DATE,
      }
    }, { sequelize: connection });
  };
};