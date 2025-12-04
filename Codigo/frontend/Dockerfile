# Usar a imagem oficial do Node.js
FROM node:20.17.0

ARG NEXT_PUBLIC_API_URL=https://dressmanager.onrender.com
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependência para o container
COPY package*.json ./

# Instale as dependências usando npm
RUN npm install

# Copie o restante dos arquivos para o container
COPY . .

# Build da aplicação Next.js
RUN npm run build

# Exponha a porta padrão do Next.js
EXPOSE 10000

# Comando para iniciar o servidor Next.js e capturar logs em caso de erro
CMD ["sh", "-c", "npm start || cp /root/.npm/_logs/* . && ls -la"]
