## Cats List


**Cats List** é apenas um app web simples que mostra como usar alguns serviços da AWS ([veja o video](https://github.com/cicerohen/playground-react-aws/assets/819041/b2328919-f2a1-428f-85ff-e9bdabbc4a8d))

<img width="1071" alt="Screenshot 2024-03-02 at 12 41 10" src="https://github.com/cicerohen/playground-react-aws/assets/819041/04f6bb51-dfc7-4b37-9b2a-f031b19b566a">

### Ferramentas usadas

[Turborepo](https://turbo.build/repo) para gerenciar este projeto como um [monorepo](https://dev.to/stanley/monorepo-o-que-e-devo-usar-133c)

#### Backend

- [API Gateway](https://aws.amazon.com/pt/api-gateway/?nc1=h_ls) para fornecer uma REST API
- [Lambda](https://aws.amazon.com/pt/lambda/?nc1=h_ls) para receber e processar requisições do API Gateway
- [DynamoDB](https://aws.amazon.com/pt/pm/dynamodb/?nc1=h_ls) para guardar os dados do app
- [S3](https://aws.amazon.com/pt/s3/?nc1=h_ls) para guardar imagens do app
- [Cognito](https://aws.amazon.com/pt/cognito/?nc1=h_ls) para gerenciar a autenticação
- [Serverless Framework](https://www.serverless.com/framework/docs) para iniciar/gerenciar os serviços citados acima

Todos os serviços da AWS citados acima tem [**nível gratuito**](https://aws.amazon.com/pt/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all)

#### Frontend

- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/) para estilizar os componentes React
- [Formik](https://formik.org/) e [Yup](https://github.com/jquense/yup) para criar e controlar os formulários do app
- [HeadlessUI](https://headlessui.com/) para criar componentes de UI como popover, combobox e modal

#### Testes

Em breve testes com [Jest](https://jestjs.io/) e [Cypress](https://www.cypress.io/) serão adicionados. Se estiver interessado em praticar, sinta-se à vontade para forkar o projeto e adicionar casos de teste.

### Configurando o backend

Antes de seguir os passos abaixo você precisa [criar uma conta](https://portal.aws.amazon.com/billing/signup#/start/email) na AWS

1. [Crie um usuário administrativo](https://docs.aws.amazon.com/pt_br/SetUp/latest/UserGuide/setup-configadminuser.html) ([veja o video](https://github.com/cicerohen/playground-react-aws/assets/819041/2429a1ed-249d-420c-97fa-b163fa436550))

2. [Crie as chaves de acesso](https://docs.aws.amazon.com/pt_br/IAM/latest/UserGuide/id_credentials_access-keys.html?icmpid=docs_iam_console#Using_CreateAccessKey) ([veja o video](https://github.com/cicerohen/playground-react-aws/assets/819041/2429a1ed-249d-420c-97fa-b163fa436550))

3. Crie um arquivo _.env_ na pasta _/backend_ com as seguintes variáveis

   ```
   AWS_ACCESS_KEY_ID=cole_a_access_key_aqui
   AWS_SECRET_ACCESS_KEY=cole_a_secret_access_key_aqui
   REGION=us-east-1
   ```

4. Instale as dependências e faça o build do backend

   ```
      yarn && yarn build --scope=backend
   ```

5. Execute _yarn sls:deploy_ para inicializar todos os serviços da AWS configurados em [_/backend/serverless.yml_](/backend/serverless.yml)

6. Aguarde o comando _yarn sls:deploy_ to ser concluído e verifique se todos os serviços da AWS foram criados:
   ![Screenshot from 2024-03-01 14-35-03](https://github.com/cicerohen/playground-react-aws/assets/819041/c8668cd5-1b0e-43e2-9d5c-74d36a49d805)

   6.1 [Rotas do API Gateway](https://us-east-1.console.aws.amazon.com/apigateway/main/apis?region=us-east-1)

   6.2 [Funções Lambda](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions)

   6.3 [Tabelas no DynamoDB](https://us-east-1.console.aws.amazon.com/dynamodbv2/home?region=us-east-1#tables)

   6.4 [Bucket no S3](https://s3.console.aws.amazon.com/s3/home?region=us-east-1#)

   6.5 [User pool no Cognito](https://us-east-1.console.aws.amazon.com/cognito/v2/idp/user-pools?region=us-east-1)

7. Quando o **_passo 6_** for concluído navegue para o [dashboard do API Gateway](https://us-east-1.console.aws.amazon.com/apigateway/main/apis?region=us-east-1) e siga os passos abaixo:

   7.1 Clique na API chamada _react-aws_

   7.2 Click no link contendo _"API:react-aws..."_ na barra lateral da página

   7.3 Procure uma seção chamada _Estágios para a react-aws_

   7.4 Copie o link da coluna Invocar URL, cole no navegador e adicione _/breeds_ no final da URL.

   7.5 Navegue para a URL para ver as raças de gatos serem listadas. E enfim, sua REST API está funcionando.

### Configurando o frontend

1. Crie um arquivo .env.local na pasta [/frontend](/frontend) com as seguintes variáveis

   ```
   VITE_API_BASE=cole_o_link_da_coluna_invocar_url_aqui
   ```

### Iniciando o projeto

```
yarn && yarn dev
```
