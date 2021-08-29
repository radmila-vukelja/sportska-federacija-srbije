package rs.tfzr.service.utils;

import org.springframework.stereotype.Component;
import rs.tfzr.model.AppUser;
import rs.tfzr.model.dto.EmailMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import java.util.Base64;

@Component
public class EmailService {

    private JavaMailSender javaMailSender;

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public boolean sendEmail(EmailMessage emailMsg) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setTo(emailMsg.getTo());
        helper.setSubject(emailMsg.getSubject());
        helper.setText(emailMsg.getText(), true);
        javaMailSender.send(message);
        return true;
    }

    public String encodeToBase64(String string) {
        return Base64.getEncoder().encodeToString(string.getBytes());
    }

    public EmailMessage createEmailConfirmationMessage(AppUser user) {
        //NOTE: change this so user doesnt see full link
        String url = "http://localhost:8080/email/confirm-email/" + user.getEmailConfirmationString();
        String htmlText = "<html><head></head><body style=\"background-color: #e4e5f1;display:flex; justify-content: center; align-items: center; flex-direction: column; height:100%; width:100%;\"><div style=\"display:flex; justify-content: center; align-items: center; height: 400px; width: 480px;  margin: 10px;\"><a href=\"" + url + "\">Kliknite ovde da potvrdite vas email</a></div></body></html>";
        // String linkToConfirm = "Kliknite ovde da potvrdite Vas nalog! \n
        String linkToConfirm = "<html> <head></head> <body> </body> </html>";
        String subject = "Molimo vas da potvrdite vas nalog!";
        EmailMessage emailMessage = new EmailMessage(user.getEmail(), subject, htmlText);
        System.out.println(emailMessage.toString());
        return emailMessage;
    }

    public EmailMessage createResetPasswordMessage(AppUser user) {

        String url = "http://localhost:4200/change-password";
        String text = "Vasa sifra je resetovana. \nOvo je vasa nova sifra " + user.getPassword();
        String htmlText = "<html><head></head><body style=\"background-color: #e4e5f1;display:flex; justify-content: center; align-items: center; flex-direction: column; height:100%; width:100%;\"><div style=\"display:flex; justify-content: center; align-items: center; height: 400px; width: 480px;  margin: 10px;\"> " + text + " <a href=\"" + url + "\">Kliknite ovde da bi ste promenili sifru</a></div></body></html>";

        //remember to change the password before sending him his actuall password
        String subject = "Resetovanje sifre!";
        return new EmailMessage(user.getEmail(), subject, htmlText);
    }

}
