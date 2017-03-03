## Installation

Install .net core for Mac
https://www.microsoft.com/net/core#macos

after this you should be able to run
`dotnet`
from the terminal successfully

clone the repository
`git clone git@github.com:buildingblocks/bb-prototype-website-razor.git`

`cd site`

restore dependencies for .net core
`dotnet restore`

install node modules
`npm i`

run the site
`gulp`

## Page Content

Pages are defined in the Pages Views folder. This is mapped to URLs through a convention.

/pages/contentcards will be mapped to the view /Views/Pages/ContentCards.cshtml

## API Content

To return JSON from the application json files can be placed in the api folder.

These can then be accessed through a convention mapping the folder structure to the json files.

/api/content will rerurn the /api/content.json

/api/users/user will return a json fole placed at /api/users/user.json


