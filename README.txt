/* INSTALL */

Required Node verson: 18.16.1 (x64)


1) clonle the project from git: http://git-server2.histaff.online:3000/git/tannv/HistaffAngularFrontend.git

2) Running Development with HTTPS:
    Generating an SSL Certificate:
    You need a package manager to install mkcert. For Windows, use chocolatey (PowerShell)

        Install mkcert: run this command in PowerShell:
            choco install mkcert

        Create a locally trusted CA with:
            mkcert -install

        In the root folder of the project, generate an SSL certificate with:
            mkcert localhost

3) from root folder of the project, run:
    yarn

4) copy syncfution node-module files
    from: http://git-server2.histaff.online:3000/tannv/syncfussion_angular14 (syncfussion-angular.zip)
    to: ./node_modules/@syncfusion/

5) from root folder of the project, run:
    yarn start

6) Mapping Api endpoint
    Comment/uncomment AppConfigService.ts

    BASE_URL: string = "https://localhost:44359"; // is for development
    //BASE_URL: string = "https://tanleica.com"; // is for production testing


Important: Whenever you install new library (using yarn <new_library> add or npm install <new_library>), you must repeat the step 4)


/* BUILD */
    Development: ng build
    Production: ng build --configuration production
