### General Assembly Project-3: Full-stack Project. 
#  --Hidden Gems--

Contributers: Mayur Kumar, Tom Murphy & Marilyn Poku

### Project Link : TBA

## Table of Contents

- [Brief](#brief)
- [Concept](#concept)
- [Languages, Packages and, technology used](#languages-packages-and-technology-used)
  - [Back-end](#back-end)
  - [Front-end](#front-end)
- [Install](#install)
- [Approach](#approach)
  - [Document-Model-Breakdown](#document-model-breakdown)
  - [API-End-Points](#api-end-points)

## Brief
Working for the first time as a group of 3, myself (Mayur), Tom and Marilyn over a period of 8 working days created a full stack front-end webstie and back-end database for our 3rd project during the **Software Engineering Immersive** (SEI)  bootcamp at **General Assembly**. 

Our task was to create a **back-end** database with Mongoose, MongoDB, Node and Express JS with API endpoints to seed data and give users ability to register/login, create new and edit documents while navigating a **front-end** website built with **React JS**. The website also needed to be **mobile friendly** as well as usable on a desktop. 

## Concept
The site we built is called Hidden Gems, a website where users can explore a map of the UK & Ireland and find interesting real locations around the country that are lesser known or documented and learn more about them. 

On the home page you can discover new locations from randomly generated carousels and some of the highest rated places too. Here you can also search by name and type of place that suit your interests.

Users are able to navigate around the map and see markers that represent each location, where upon clicking a marker it will display a popup with a picture and basic information about the place. The popup links to a showcase page where you can see a description of the location, ratings and comments users have given it. Users are also able to like a comment made by others. In order to enable users to interact with the webpage, they would have to register/login. This will also enable users to add their own locations to the map by clicking on an empty space on the map which will show a prompt for users to make a new entry (What we call a "(Hidden) Gem").

To add to a sense of personal presence, users are able to create their own profile for others to view, here you can upload a profile photo and write a bio about yourself. The profile page will also display all the entries the user has made, and display the average rating of all the scores that have been given to it. 

![Home Map page mobile](https://github.com/Kumasta/Images-Gifs/blob/main/mobile-home-map.png?raw=true)

## Languages, Packages and, technology used:
- Javascript
- SASS (CSS)
- JSX (HTML5 via react)

### Back-end
- express: ^4.17.2,
- jsonwebtoken: ^8.5.1,
- mongoose: ^6.2.1,
- mongoose-unique-validator: 2.0.3

### Front-end
- axios: ^0.25.0,
- bootstrap: 5.1.3,
- buffer: ^6.0.3,
- eslint-plugin-react: ^7.28.0,
- mapbox-gl: ^2.7.0,
- react: ^17.0.2,
- react-bootstrap: ^2.1.2,
- react-dom: ^17.0.2,
- react-map-gl: ^7.0.5,
- react-router-dom: ^6.2.1,
- react-router-hash-link: ^2.4.3,
- react-scripts: 5.0.0,
- react-select: ^5.2.2,
- sass: ^1.49.7

## Install
<img width="184" alt="Screenshot 2022-02-21 at 17 42 32" src="https://user-images.githubusercontent.com/94964514/155004644-f473a963-d049-421c-bae0-3f0cb4125834.png">

If working on local server:  

1. Install mongoDB [https://docs.mongodb.com/guides/server/install/] and start mongo server.       
2. Start database from your terminal `mongosh`   
Back end terminal         
3. Install packages `yarn init`   
4. seed database `yarn seed`   
5. start server `yarn serve`   

Front End terminal    
1. Install packages `yarn`   
2. start site server `yarn start`      

## Approach

We began the project creating a wireframe draft of the website and its different components. Using a colour code system we divided our completion targets by MVP and stretch goals if we meet them. MVP goals would include a home page with carousel and search functionality for our main documents. An interactive map using mapbox-gl to discover locations and a link to a showcase of  them. As well as being able to link to make new entries and the ability to post comments on each showcase. To be able to register and login as a user to interact with the site.  
![Project-3-wire-frame](https://user-images.githubusercontent.com/94964514/155013109-a7a4ba48-7eba-4ab6-95c4-4a0bc553f325.png)

We then created a trello Kanban workspace and roughly planned out the theme, design, user stories, components and file structure. We each would then take a component and start building the front-end after the back-end was done together at once.
<img width="1680" alt="image" src="https://user-images.githubusercontent.com/94964514/155026617-d7a54fb2-73a8-43f3-bf55-72f0be39a091.png">


### Document Model Breakdown. 
We started with building the back-end database, models, controllers and routes. Our main documents for the database were broken into 2 parts, locations (What we call "pins") and user.  

#### User Model
The user model comprises basic login details, username, email, password and confirmation. as well as an embedded schema for a profile schema which was utilised for one of our stretch goals for a profile page which will be described further down. We also have a virtual field of owned "pins" that the user creates on the site, this would allow for permissions checks for editing and deleting documents. 
<img width="547" alt="image" src="https://user-images.githubusercontent.com/94964514/155013958-9bc5ff8d-525a-404d-96ef-0d889a83c2e3.png">

#### Pin Model
The "pin" schema contained a lot more keys as well as more embedded schemas. An embedded comment schema and a like rating schema as well as a "like" schema that is embedded in the comment schema to enable users to like a comment as one of our stretch goals. Virtual fields include an average rating calculated from the array of ratings that would be produced and a total "likes" virtual field to count how many likes are in the array.   
<img width="377" alt="image" src="https://user-images.githubusercontent.com/94964514/155014654-9821b963-de59-4458-80c0-d4ec46c33ec2.png">


### API-End-Points
(* secure route)   
(+ Body required)   
({ } id/text/token)

#### Main documents (pins)
- Get all `Get /api/pins`
- Get one `Get /api/pins/{pin ID}`
- Post new*+ `POST /api/pins`    
![image](https://user-images.githubusercontent.com/94964514/155016630-0338f716-fdda-4520-bf81-410db1c59b4e.png)
- Update one*+ `PUT /api/pins/{pin ID}`   
![image](https://user-images.githubusercontent.com/94964514/155016825-4e562a86-c2c2-4cae-b216-e0a3250a73e1.png)
- Delete one* `DELETE /api/pins/{pin ID}`

#### Pin Rating
- Add rating*+ `POST /api/pins/{pin ID}/rating` (Between 1 - 5).   
![image](https://user-images.githubusercontent.com/94964514/155017307-eb729923-826f-41f9-8228-df191e30989e.png)
- Update rating *+ `PUT /api/pins/{pin ID}/rating/{rating ID}` (Between 1 - 5)    
![image](https://user-images.githubusercontent.com/94964514/155017462-bd1b5bb2-b093-4590-b511-c1bc16226987.png)

#### Pin Comment 
(During development we changed terminology from review to comments)     
- Add comment*+ `POST /api/pins/{pin ID}/reviews`    
![image](https://user-images.githubusercontent.com/94964514/155023193-371db78c-07f7-4eef-9be8-a2ae3647470d.png)
- Updated comment*+ `PUT /api/pins/{pin ID}/reviews/{review ID}`   
![image](https://user-images.githubusercontent.com/94964514/155023341-2a0a6ff4-59de-4551-9b51-cba606e84f41.png)
- Delete comment* `DELETE /api/pins/{pin ID}/reviews/{review ID}`

#### Comment like
- Like comment*+ `POST /api/pins/{pin ID}/review/{review ID}/like`        
![image](https://user-images.githubusercontent.com/94964514/155023611-43401d2b-ed57-4d16-abe0-e905c551c4e2.png)
- Unlike comment* `DELETE /api/pins/{pin ID}/review/{review ID}/like/{like ID}`

#### Login / Register
- Register User+ `POST /api/register`    
![image](https://user-images.githubusercontent.com/94964514/155023903-53a24d70-efe8-4591-8ed0-2f9117f5d159.png)
- Login user+ `POST /api/login`     
![image](https://user-images.githubusercontent.com/94964514/155024015-daf589cd-0bf8-4dba-806d-80e4b78a1f93.png)

#### User Profile
- Get one profile `GET /api/profile`    
- Update own profile*+ `GET /api/profile`    
![image](https://user-images.githubusercontent.com/94964514/155024386-6dac1ce5-6922-4580-b11a-183239e4f702.png)

#### Mapbox Geocode API
Enables serach for address on the map. Container props for limited search for Uk & Ireland and fuzzy match.         
`GET https://api.mapbox.com/geocoding/v5/mapbox.places/**{___search_text____}**.json?country=gb,ie&fuzzyMatch=true&access_token=**{_mapbox_token_}**`

### Front-end components

#### Nav-Bar
Nav bar contains links to home, map and profile pages. The serach bar is contained on the home page so the serach link will take you to the home page and using react-router-hash-link, scroll the page down to the search. While the user is not logged in, buttons to login & register are displayed.   
<img width="793" alt="image" src="https://user-images.githubusercontent.com/94964514/155026273-af51ddd2-1a03-4f85-b11a-04c0cf2acc87.png">

After loggin in the button switch to logout and a link to the users profile page. The site name and diamond logo (Nav.Brand) in the top left will link you to the home page.   
<img width="793" alt="image" src="https://user-images.githubusercontent.com/94964514/155026178-ef71e8fa-d2e9-4970-80f7-b0fa67f80af4.png">

In mobile view, the nav bar collaspes into a dropdown activted by clicking on the "hamburger" icon.    
<img width="558" alt="image" src="https://user-images.githubusercontent.com/94964514/155028128-016ddffa-1c39-45b9-8c3b-fc1a7f7fea90.png">

<img width="559" alt="image" src="https://user-images.githubusercontent.com/94964514/155027599-cd8e0937-8dc5-4e4b-a722-c945308dd1f5.png">

#### Home page

Hero Carousel   
<img width="813" alt="image" src="https://user-images.githubusercontent.com/94964514/155029179-47dd9457-542c-4ba7-ba1f-5ec842954f90.png">

Highest Rated display
<img width="1416" alt="image" src="https://user-images.githubusercontent.com/94964514/155029369-c3668d87-71d5-45e2-bb20-7ea0e8824c26.png">

Search Bar
<img width="1133" alt="image" src="https://user-images.githubusercontent.com/94964514/155029584-293e9d19-d29b-4a30-b575-a31d24c0803e.png">


