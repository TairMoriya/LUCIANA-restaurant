import smtplib
from email.mime.text import MIMEText
from email.header import Header

smtp_server = "smtp.gmail.com"
smtp_port = 587
sender_email = "tairmoriya24@gmail.com"
receiver_email = "stavtsadok1@gmail.com"
password = "zrrp rxgf mfvj ugdm"

subject = Header('LUCIANA Restaurant', 'utf-8')
body = 'הזמנה שלך התקבלה בהצלחה! נשמח לראותך בקרוב במסעדה שלנו'
msg = MIMEText(body, 'plain', 'utf-8')
msg['Subject'] = subject
msg['From'] = sender_email
msg['To'] = receiver_email

try:
    smtp = smtplib.SMTP(smtp_server, smtp_port)
    smtp.starttls()
    smtp.login(sender_email, password)
    smtp.sendmail(sender_email, receiver_email, msg.as_string())
    print("המייל נשלח בהצלחה!")

except smtplib.SMTPException as e:
    print(f"שגיאת SMTP בשליחת המייל: {e}")
except Exception as e:
    print(f"שגיאה בלתי צפויה בשליחת המייל: {e}")
finally:
    if smtp:
        smtp.quit()
