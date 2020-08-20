# SMS Gateway (Application Cordova)

Interface http pour l'envoi de SMS.
compatible Android 8 et supperieur.

## Utilisation :
1. compiler l'apk, connaitre l'ip du téléphone (pour cette doc l'ip sera noté : 192.168.1.xx)
2. Installer et lancer l'APK sur le téléphone
3. Depuis votre navigateur allez sur http://192.168.1.xx:8080/run pour verifier que le serveur répond
4. (facultif) Definir un mot de passe sur l'interface de l'application
5. Envoyez vos SMS (en POST ou GET) avec l'adresse : <br/>
    http://192.168.1.xx:8080/sendsms?phone=06xxxxxxxx&text=LeMessage&psw=VotrePasswordSiDefini
    
## Plugins :
webserver : https://github.com/bykof/cordova-plugin-webserver <br/>
sms : https://github.com/cordova-sms/cordova-sms-plugin <br/>
permissions : https://github.com/NeoLSN/cordova-plugin-android-permissions <br/>
