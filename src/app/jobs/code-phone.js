require('dotenv').config();
import { TextMessageService } from 'comtele-sdk';


export default new class SMS {
  constructor() {
    this.textMessageService = new TextMessageService(process.env.API_KEY);
  };

  sendMessage({ user: user }) {
    this.textMessageService.send(user.id,
      `Olá ${user.first_name} ${user.last_name} aqui esta seu código de verificação: ${user.code}`,
      [`${user.phone}`],
      (result) => {console.log(result)});
  };

  sendScheduledMessage({ user: user }, task, date) {
    this.textMessageService.schedule(user.id,
      `${user.first_name}!! não se esqueça, você tem até amanhã para terminar a tarefa "${task}"`,
      `${date} 09:00:00.`,
      [`${user.phone}`],
      (result) => {console.log(result)});
  };
};