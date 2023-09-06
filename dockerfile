# Immagine di base per questo container è l'immagine Node.js più recente
FROM node:latest

# Imposto le variabili d'ambiente all'interno del container, per una maggiore felssibilità.
ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password
    
# Eseguo questo comando per creare una directory padre /home/app
RUN mkdir -p /home/app

# Copio l'applicazione nella directory /home/app da Host a container
COPY ./app /home/app

# Imposto la directory predefinita in modo che i comandi successivi vengano eseguiti in /home/app
WORKDIR /home/app

# Garantisco che le dipendenze siano installate all'interno dell'immagine del container
RUN npm install

# Comando per avviare l'applicazione
CMD ["node", "server.js"]
