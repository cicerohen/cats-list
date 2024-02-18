[README em português](/README-ptBR.md)

# Playground React AWS
[Click here to see more playground examples](https://github.com/cicerohen/playground)

**Playground React AWS** is just an app that shows how to use some AWS tools. ([see video](https://github.com/cicerohen/playground-react-aws/assets/819041/b2328919-f2a1-428f-85ff-e9bdabbc4a8d))

<img width="1071" alt="Screenshot 2024-03-02 at 12 41 10" src="https://github.com/cicerohen/playground-react-aws/assets/819041/04f6bb51-dfc7-4b37-9b2a-f031b19b566a">


### Tools used in this project

[Turborepo](https://turbo.build/repo) to manage this project as a [monorepo](https://turbo.build/repo/docs/handbook/what-is-a-monorepo)

#### Backend

- [API Gateway](https://aws.amazon.com/api-gateway/?nc1=h_ls) to expose a REST API
- [Lambda](https://aws.amazon.com/lambda/?nc1=h_ls) to receive and process requests from API Gateway
- [DynamoDB](https://aws.amazon.com/pm/dynamodb/?nc1=h_ls) to store app data
- [S3](https://aws.amazon.com/s3/?nc1=h_ls) to store app images
- [Cognito\*\*](https://aws.amazon.com/cognito/?nc1=h_ls) to handle authentication
- [Serverless Framework](https://www.serverless.com/framework/docs) to provision and orchestrate the services mentioned above

All AWS services above are available on [**free tier**](https://aws.amazon.com/free/free-tier/?p=ft&z=subnav&loc=1&refid=f429fc61-8899-4c6c-bae4-67e294a64b06)

#### Frontend

- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/) to beautify React components
- [Formik](https://formik.org/) and [Yup](https://github.com/jquense/yup) to handle app forms
- [HeadlessUI](https://headlessui.com/) to build common UI components like popover, combobox and modal


#### Tests

Soon [Jest](https://jestjs.io/) and [Cypress](https://www.cypress.io/) tests will be added. Feel free to fork it and add test cases if you are interested in practicing tests.

### Configuring backend

Before you follow the steps below you need to [create an account](https://portal.aws.amazon.com/billing/signup#/start/email) on the AWS platform

1. [Create an administrative user](https://docs.aws.amazon.com/SetUp/latest/UserGuide/setup-configadminuser.html) ([see video](https://github.com/cicerohen/playground-react-aws/assets/819041/2429a1ed-249d-420c-97fa-b163fa436550))

2. [Create an access key](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html?icmpid=docs_iam_console#Using_CreateAccessKey) ([see video](https://github.com/cicerohen/playground-react-aws/assets/819041/2429a1ed-249d-420c-97fa-b163fa436550))

3. Create a _.env_ file on _/backend_ folder with the following variables

   ```
   AWS_ACCESS_KEY_ID=place_access_key_here
   AWS_SECRET_ACCESS_KEY=place_secret_access_key_here
   REGION=us-east-1
   ```

4. Run _yarn sls:deploy_ to provision/start all AWS services configured in [_/backend/serverless.yml_](/backend/serverless.yml)

5. Wait for _yarn sls:deploy_ to complete and check if all services were created:
   ![Screenshot from 2024-03-01 14-35-03](https://github.com/cicerohen/playground-react-aws/assets/819041/c8668cd5-1b0e-43e2-9d5c-74d36a49d805)

   5.1 [API Gateway routes](https://us-east-1.console.aws.amazon.com/apigateway/main/apis?region=us-east-1)

   5.2 [Lambda functions](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions)

   5.3 [DynamoDB tables](https://us-east-1.console.aws.amazon.com/dynamodbv2/home?region=us-east-1#tables)

   5.4 [S3 bucket](https://s3.console.aws.amazon.com/s3/home?region=us-east-1#)

   5.5 [Cognito user pool](https://us-east-1.console.aws.amazon.com/cognito/v2/idp/user-pools?region=us-east-1)

6. If _step 5_ was successful navigate to [API Gateway dashboard](https://us-east-1.console.aws.amazon.com/apigateway/main/apis?region=us-east-1) and follow the steps below:

   6.1 Click on an API called _react-aws_

   6.2 Click on a link on the left sidebar containing _"API:react-aws..."_

   6.3 Search for a section called _Stages for react-aws_

   6.4 Copy Invoke URL, paste it into your browser, and add _/breeds_ at the end.

   6.5 Navigate to the URL to see cat breeds. And that`s it, your REST API is working.

### Configuring frontend

1. Create a .env.local file on [/frontend](/frontend) folder with the following variables

   ```
   VITE_API_BASE=place_invoke_url_here
   ```

### Starting the project

```
yarn && yarn dev
```
