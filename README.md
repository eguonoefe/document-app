## Document Management System

Document Management System provides a system for users to create and manage documents giving different privileges based on user roles and managing authentication using JWT.

#### Application Features

The following features make up the Document Management System:

###### Authentication

- It uses JSON Web Token (JWT) for authentication
- It generates a token on successful login or account creation and returns it to the user
- It verifies the token to ensure a user is authenticated to access every endpoints

###### Users

- It allows users to be created  
- It allows users to login and obtain a unique token which expires every 12hours
- It allows authenticated users to retrieve and update their information 
- It allows users to retrieve their documents based on userId
- It allows the admin to manage users

###### Roles

- It ensures roles can be created, retrieved, updated and deleted by an admin user
- A non-admin cannot access this endpoint
- A non-admin user cannot create, retrieve, modify, or delete roles

###### Documents

- It allows new documents to be created by authenticated users 
- It ensures all documents are accessible based on the permission/priviledges 
- It allows admin users to create, retrieve, modify, and delete documents
- It ensures users can retrieve, edit and delete documents that they own  
- It allows users to retrieve all documents they own as well as public documents
- It allows users to retrieve all public documents
- It allows users on the same role to retrieve role-based documents

###### Search

- It allows admin to retrieve all documents that matches search term
- It allows admin to search users based on a specified search term
- It allows users to search public documents for a specified search term
- It allows users to search for users through name or email address
- It allows users on the same role to search through role-based documents 

### **Installation Steps**
* Clone the repository
* Create a `.env` file from the example file `.env.example`
* Ensure you have `docker` installed on your local machine. You can check this by running `docker --version`
* Run `docker-compose build` to build the service images
* Run `docker-compose up` to start up the containers for the services
* Open application locally on `localhost:5000`
* To remove volume and container run `docker-compose down`

### How to Contribute
Contributors are welcome to further enhance the features of this API by contributing to its development. The following guidelines should guide you in contributing to this project:

1. Fork the repository.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request describing the feature(s) you have added

Ensure your codes follow the [AirBnB Javascript Styles Guide](https://github.com/airbnb/javascript)
