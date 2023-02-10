**supaKanban**

## Features 1.0

- create, rename and delete kanban
- create, rename and delete list on kanban
- create, rename, delete, and drag and drop any task on list

## Features 1.1

- authentification system
- retrive all kanban of user after login
- change password
- see our statistics

## Upcoming update

- coming soon

## Installation

1. just open the terminal, go to the _**back**_ folder write this command to install all the packages needed to run the project and repeat the same action for _**front**_ folder

```bash
npm i
```

2. create a new folder _**keys**_ inside the _**back**_ folder and from this new folder write this command  

```bash
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
```
press "enter" twice to not add password, 
after then create a public key from the private key


```bash
ssh-keygen -e -m PEM -f jwtRS256.key > jwtRS256.key.pub
```

3. create file "index.js" inside _**keys**_ folder and write this code for easily exporting the keys


```bash
const fs = require('fs');

module.exports = {
    key: fs.readFileSync(`${__dirname}/jwtRS256.key`),
    keyPub: fs.readFileSync(`${__dirname}/jwtRS256.key.pub`)
};
```

4. After that write this command from _**front**_ folder and _**back**_ folder to launch the project

```bash
npm start
```