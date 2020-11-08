# AWS SAM - TypeScript Backend With Yarn & Webpack

This repository shows how to build & deploy a Typescript backend monorepo using AWS SAM, Yarn & Webpack.

## Prerequisites

### AWS SAM

The AWS Serverless Application Model (SAM) is an open-source framework for building serverless applications. It provides shorthand syntax to express functions, APIs, databases, and event source mappings. With just a few lines of configuration, you can define the application you want and model it.

- https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html
- https://github.com/aws/serverless-application-model
- https://github.com/aws/aws-sam-cli

Currently, SAM does not support natively & efficiently monorepo TypeScript applications. This is why I created this repository.

### NodeJS

Node.js is an open-source, cross-platform, back-end, JavaScript runtime environment that executes JavaScript code outside a web browser.

- https://nodejs.org/en/

We will be using NodeJS 12.x as it is the latest version supported by AWS at the moment.

### Yarn

Yarn is a package manager for your code. It allows you to use and share code with other developers from around the world. Yarn does this quickly, securely, and reliably so you don't ever have to worry.

- https://yarnpkg.com/

Yarn is used instead of NPM as it has better support in local dependencies management.

### Webpack

At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.

- https://webpack.js.org/

## Folder hierarchy

```
.
├── .aws-sam                       # SAM artifacts folder
├── build                          # Build folder
    ├── package.json               # Dependencies for build like typescript, jest, webpack, types, ...
    ├── tsconfig.json              # TypeScript configuration
├── functions                      # Functions folder
    ├── hello-function             # Hello function folder
        ├── src                    # Source code for hello function
        ├── dist                   # JavaScript files generated by Webpack
        ├── package.json           # No dependency, only required by SAM
    ├── goodbye-function           # Goodbye function folder
        ├── src                    # Source code for goodbye function
        ├── dist                   # JavaScript files generated by Webpack
        ├── package.json           # No dependency, only required by SAM
    ├── dist                       # JavaScript files generated by TypeScript Compiler
    ├── package.json               # Local dependencies only (paths to build & layers dependencies)
    ├── tsconfig.json              # TypeScript configuration (extending the one in build folder)
    ├── webpack.config.js          # Webpack configuration
├── layers                         # Layers folder
    ├── global-layers              # Global layers folder
        ├── aws-global-layer       # AWS global layer folder
            ├── package.json
        ├── common-global-layer    # Common global layer folder
            ├── package.json
    ├── function-layers            # Functions layers folder
        ├── hello-function-layer   # Hello function layer folder
            ├── package.json
        ├── goodbye-function-layer # Goodbye function layer folder
            ├── package.json
├── shared                         # Shared code folder
    ├── src
    ├── dist
    ├── package.json
    ├── tsconfig.json
├── package.json
├── template.yml
```
