import { DataTypes, Model } from 'sequelize';


export default class User extends Model {
  static init(connection) {
    super.init({
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      code: {
        type: DataTypes.STRING
      },
      active: {
        type: DataTypes.BOOLEAN
      },
      avatar: {
        type: DataTypes.STRING
      },
    }, { sequelize: connection });
  };
};