import { TextMessageService } from 'comtele-sdk';


export default new class SMS {
  sendMessage({ user: user }) {
    const textMessageService = new TextMessageService(process.env.API_KEY);
    
    textMessageService.send(user.id,
      `Olá ${user.first_name} ${user.last_name} aqui esta seu código de verificação: ${user.code}`,
      [`${user.phone}`],
      (result) => {console.log(result)});
  };
};