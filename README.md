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

## Component Content

Components are defined in the /Views/Components folder.

These can be rendered using the @Component.Render method. 

JSON files in the data folder are available by convention for dummy data e.g.:

     @Component.Render( viewName : "~/Views/Components/content-cards/content-cards.cshtml", 
                       componentPath : "content-cards.contentCards.blockA")
											 
componentPath maps to a JSON file called content-cards.json which contains an object called contentCards with a property blockA which has the data for a content card.

## API Content

To return JSON from the application json files can be placed in the api folder.

These can then be accessed through a convention mapping the folder structure to the json files.

/api/content will rerurn the /api/content.json

/api/users/user will return a json fole placed at /api/users/user.json


