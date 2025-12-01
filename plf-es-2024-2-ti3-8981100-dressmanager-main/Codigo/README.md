# Código do Projeto

Mantenha neste diretório todo o código do projeto. Se necessário, descreva neste arquivo aspectos relevantes da estrutura de diretórios criada para organização do código.


# Estrutura de Diretórios

O Código do projeto está dividido em 2 principais diretórios, sendo eles, fundamentalmente, backend e frontend.

~~~
/Codigo
   |
   |---- /.devcontainer
   |           |---- devcontainer.json
   |
   |---- /backend
   |         |---- docker-compose.yml
   |         |---- Dockerfile
   |         |---- dressmanager
   |                    |---- pom.xml
   |                    |---- (...)
   |---- /frontend
   |         |
   |         |---- docker-compose.yml
   |         |---- Dockerfile
   |         |---- (...)
   | 
~~~

   # Como Rodar a Aplicação?

   O Dress Manager aborda a utilização de containers, consequentemente, o uso de Docker.

   Para a configuração do ambiente, instale as seguintes ferramentas: 
   - [Visual Code](https://code.visualstudio.com/download)
   - [WSL](https://learn.microsoft.com/pt-br/windows/wsl/install)
   - [Docker Desktop](https://www.docker.com/products/docker-desktop/)

   Para subir a aplicação é necessário rodar os seguintes comandos:

   1. Com o ambiente devidamente configurado, abra uma janela de configuração remota conforme o ícone na imagem abaixo: 
   ![abrir conexão remota](../Artefatos/img/abrir_conexão_remota.png)
   ![abrir conexão remota](../Artefatos/img/conectar_ao_wsl.png)

   2. Faça o clone do repositório em sua máquina local:
      ![abrir conexão remota](../Artefatos/img/clonar_repositório_wsl.png)

   3. Com o Docker Desktop aberto e o WSL configurado, suba o docker para a criação dos containers do backend. Sendo eles o backend em si com o projeto em Java com Maven e SpringBoot, e o PostgreSQL. Para isso, rode os comandos na sequência abaixo:

      ~~~cmd
      cd /Codigo/backend/
      ~~~

      ~~~docker
      docker-compose down
      ~~~

      ~~~docker
      docker-compose up --build
      ~~~

   4. Agora que o backend e o banco estão rodando, suba o container do frontend com os seguintes comandos:

      ~~~cmd
      cd ../..
      ~~~

      ~~~cmd
      cd /Codigo/frontend/
      ~~~

      ~~~docker
      docker-compose down
      ~~~

      ~~~docker
      docker-compose up --build
      ~~~

   5. Acesse a aplicação no link:

      ~~~url
      http://localhost:3000/
      ~~~