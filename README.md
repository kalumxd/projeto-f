# Gerenciador de Usuários

Este projeto é uma aplicação web que gerencia usuários. Utilizei as seguintes tecnologias e recursos:

- **Tecnologias Utilizadas:**
  - ReactJS
  - Material-UI
  - SweetAlert2
  - MUI Data Grid
  - Local Storage

- **Funcionalidades:**
  1. **Listagem de Usuários:**
     - Exibe uma lista de usuários cadastrados em uma tabela.
     - Cada usuário possui informações como ID, nome, senha e data de cadastro.
     - Fornece botões de edição e exclusão para cada usuário.

  2. **Cadastro de Usuários:**
     - Permite adicionar novos usuários à lista.
     - Abre um modal para inserção dos dados do novo usuário.
     - Os dados do usuário são armazenados localmente usando o Local Storage.

  3. **Edição de Usuários:**
     - Permite editar as informações de um usuário existente.
     - Ao clicar no botão de edição, abre um modal com os campos de edição preenchidos com os dados do usuário selecionado.
     - Após a edição, os dados são atualizados na lista e armazenados localmente.

  4. **Exclusão de Usuários:**
     - Permite excluir um usuário da lista.
     - Exibe um alerta de confirmação antes de excluir o usuário.
     - Após a confirmação, o usuário é removido da lista e os dados atualizados localmente.

  5. **Autenticação de Usuários:**
     - Implementa um sistema básico de autenticação.
     - O usuário pode fazer login com um nome de usuário e senha.
     - Login para acessar a aplicação pela primeira vez: Usuário: Fortes / Senha: 123
     - Se as credenciais forem válidas, o usuário é redirecionado para a página principal com acesso às funcionalidades de gerenciamento de usuários.

  6. **Interface Responsiva:**
     - A interface é adaptável a diferentes tamanhos de tela, garantindo uma experiência consistente em dispositivos móveis e desktops.

Este projeto foi desenvolvido como parte de um desafio de desenvolvimento web e tem como objetivo demonstrar habilidades em ReactJS, Material-UI e outras tecnologias mencionadas.
