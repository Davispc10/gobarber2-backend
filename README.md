<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Description

App de agendamento de servi??os de barbearia.

# Documenta????o

## Recupera????o de senha

**RF**

- O usu??rio deve poder recuperar sua senha informa????o o seu e-mail;
- O usu??rio deve receber um e-mail com instru????es de recupera????o de senha;
- O usu??rio deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambientes de dev;
- Utilizar Amazon SES para envios em produ????o;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por email para resetar senha, deve expirar em 2 horas;
- O usu??rio precisa confirmar a nova senha ao resetar sua senha;

## Atualiza????o do perfil

**RF**

- O usu??rio deve poder atualizar seu nome, email e senha;

**RN**

- O usu??rio n??o pode alterar seu email para um email j?? utilizado;
- Para atualizar sua senha, o usu??rio deve informar a senha antiga;
- Para atualizar sua senha, o usu??rio precisa informar a nova senha;

## Painel do prestador

**RF**

- O usu??rio deve poder listar seus agendamentos de um dia espec??fico;
- O prestador deve receber uma notifica????o sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notifica????es n??o lidas;

**RNF**

- Os agendamentos do prestador no sia devem armazenados em cache;
- As notifica????es do prestador devem ser armazenadas no MongoDB;
- As notifica????es do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notifica????o deve ter um status de lida ou n??o-lida para que o prestador possa controlar;

## Agendamento de servi??os

**RF**

- O usu??rio deve poder listar todos os prestadores de servi??o cadastrados;
- O usu??rio deve poder listar os dias de um m??s com pelo menos um ho??rio dispon??vel de um prestador;
- O usu??rio deve poder listar hor??rios dispon??veis em um dia espec??fico de um prestador;
- o usu??rio deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h axatamente;
- Os agendamentos devem estar dispon??veis entre 8h ??s 18h (Primeiro ??s 8h, ??ltimo ??s 17h);
- O usu??rio n??o pode agendar em um hor??rio j?? ocupado;
- O usu??rio n??o pode agendar em um hor??rio que j?? passou;
- O usu??rio n??o pode agendar servi??os consigo mesmo;

# Installation

```bash
$ npm install
```

# Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

# License

  Nest is [MIT licensed](LICENSE).
