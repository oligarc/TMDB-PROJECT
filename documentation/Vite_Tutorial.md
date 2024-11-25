# Quick Vite Tutorial
https://github.com/jeatzr/diw-material/tree/main/UT3/practicas/P3.1

## Create a Vite Project:
    npm --version //to check if it's accessible
    cd to the root folder (it will be created on its own)

    npm create vite@latest   OR   the desired version

    State project name, Vanilla, Javascript

    cd to the folder created

## Installing dependencies (do this in every new device):
    npm install

This takes the dependencies referenced in package.json and installs them. I already added bootstrap with:
    npm install bootstrap@5.3.3

## Start the app in the server 
    npm run dev
We will use this command every day to start the app in dev mode. We will use **npm run build** and **npm run preview** in the future.

We can run all of this from the cmd/powershell terminal, no need for VSCode

## Project organization
To use it properly organized, we change the settings into a src folder to be the root source code folder. We configure that through vite.config.js

The plan is to deploy the project in githubpages, so we also need to change some things. First, in github settings we have to change the default build location to /docs. This means that when the Vite project compiles all the code, we only deploy what we want (the code inside src). 
    Settings > Pages > main > /docs

If we want to do things this way, we need to use **npm run build** to compile the code. The vite.config.js shows the route this process should take

In case we wanted to use scss (no), the compilation would happen on its own