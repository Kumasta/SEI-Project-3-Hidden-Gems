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
    - [Front-end components](#front-end-components)
      - [Nav-Bar](#nav-bar)
      - [Home Page](#home-page)
      - [Map Page](#map-page)
      - [Chowcase](#showcase)
      - [Gem Form](#gem-form)
      - [Profile Page](#profile-page)

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
Home page contains a carousel that on load displays 5 random records from our database. On click, it will navigate the user to the showcase of that record. Below is a card display of 3 of the highest rated gems on the site. This is specified as having an average rating of 4 or more. On each card like this you will be able to see the gem rating display which rounds up or down to the nearest 0.5 and displays a half diamond in score dynamically. Finally on the homepage is the search function of the site. Clicking on search in the Nav bar will navigate the user to the home page and scroll to the section. Here users can search by text and by category with the text input and drop down.  
<img width="809" alt="image" src="https://user-images.githubusercontent.com/94964514/158586869-13c5090f-10d6-4d71-ace6-7683c819ef13.png">

#### Map page
The map page is one of  my sections that I worked on primarily. The map is limited to view of the British Isles by defining the max bounds longitude and latitude coordinates. Users on desktop and with touch on mobile can zoom in and out, change the pitch and positions of the map at will. The filter button will provide a drop down box that allows users to filter gems by category and tag associated with it. Since there can be any number of tags in the database and not all are associated with each category, tag search is locked until you choose a category. Once a category is chosen a list of tags is generated from these filtered documents and all tags are collected and sorted into a new drop down list. This way you are guaranteed to see results when you combine filters by category and tag. 
  
![image](https://user-images.githubusercontent.com/94964514/156383787-fb64bc2f-9ee2-4b69-bac3-504ea1f63dad.png)


Clicking/tapping on a gem icon will display a popup card with a picture and basic information about that gem. Clicking anywhere else on the map will either prompt you to create a new Gem at that location or if you are not logged in, to register or log into your account. This will take you to the Gem form to create a new Gem record. 

<img width="876" alt="Screenshot 2022-03-16 at 11 53 59" src="https://user-images.githubusercontent.com/94964514/158584408-54960c88-fd6c-445b-86e4-7693a1a85cbe.png">

#### Showcase

The showcase shows the most information about the Gem record. Here users will be able to learn all the details the creator has added about the Place. At the bottom is a mini version of the map that just shows the location of the place. If users are logged in, they will be able to have further interactions with the page such as giving a rating to the Gem. Hovering over the gem rating icon will cause it to pulse and on click/tap the rating is sent through a put request and added. The average rating is updated, that score is updated in real time and the number of diamonds changes is the score dictates it to. Logged in users will also be able to type and leave comments. If they are the comment owner, they can either edit or delete it. And They will be able to like other comments too. If they click like on a comment they have liked before, the like will be removed and the count will display one less like total. 

<img width="993" alt="Screenshot 2022-03-16 at 11 59 21" src="https://user-images.githubusercontent.com/94964514/158585252-8e7dfdd6-32ce-4d6c-9bc8-e6271389a57f.png">

#### Gem Form
When users create a new Gem they will be taken to form below. Here they can add all the relevant details as they need to. Upload a photo from their library and it will then be hosted on cloudinary, and displayed at the bottom of the form. At the top is another mini map but here users can move the pin to adjust the location of the Gem. Categories are chosen from a set list but tags can either be selected from previously made ones or created by the user themselves and that will then be found in the list in the future. 

<img width="628" alt="image" src="https://user-images.githubusercontent.com/94964514/158585748-641a4ef4-abf4-493c-bf6a-aa12ba028dc8.png">

#### Profile Page
User's profile page can be accessed from the Nav bar. Their own or other user profile pages can also be accessed by clicking their user name in the showcase or comment post. Users will be able to add a profile photo and bio as well as see some basic stats of their account such as how many gems they have made, the average rating of all those that have rating, and when their account was created. If the user has created Gems it will be displayed below on the page where users will have the ability to edit the Gem or delete it. 

<img width="1283" alt="image" src="https://user-images.githubusercontent.com/94964514/158586131-d2c4014a-19f9-4387-940d-c54d7b09f236.png">


### Styling

We had thought about gradients and colour pallets in our planning stage. From our brainstorm we took away the idea of theming around gems and diamonds. The colour scheme went from simple accent colours around each page to primary black and white with a blue Gem for the dark map design so it would contrast with the page.

<img width="277" alt="image" src="https://user-images.githubusercontent.com/94964514/158597787-1eb9d391-6eb5-49e2-a1a7-4ffcffdf7912.png">

Using bootstrap with defined a lot of margin and padding amounts, the majority of the remaining styling was done using SASS. 


### Seeding
For our demonstration we created all the records as seeds in the back-end files. We had about 30~ seeds for our final presentation. 
<img width="675" alt="image" src="https://user-images.githubusercontent.com/94964514/158598795-3dec4e2c-e730-431b-83ea-a35a15920fe9.png">

## Challenges
- First time working with a map and React-Mapbox-gl was a challenge to get the components to function as I wanted, I needed to read documentation to better understand where my issues where. 
- First time creating a search system with more than 2 variables, in the case of this project it was to search by a category and a tag along with text. In the end this was simplified to category and tag until we go back and make improvements. 
- Getting the page to re-render or make a get request when the user updates a record. We spent some time working out a system to get the Get request to fire again when it was updated so that the user can see the effect it had on the page in real time. We worked out a system of useState to be affected on Put request and in turn re-run the get request for the updated information to show. 
- First time creating a backend from the ground up, we worked closely together, had some trouble with populating our models with nested schema information but it came out very well in the end.  
- Occasional merge conflicts but resolved relatively quickly.
- As a group picking a theme/main purpose of the site took some time before we were all behind it. 

## Future Improvements / Changes

- Dislike a comment:          
  At the moment users can like a comment but we built into our  like model a boolean value which would allow us to tally up the total amount of likes, the boolean value we would be able to tally up true values vs false values. This would require changes to the request handling in the front end component. 

- Re-structure of files/components in the front end file:       
  As this was the first project in a group of 3, the organisation of the components was messy and hard to follow for another person to look at and understand. 
  
- Sort Gems by other metrics:          
  In the search component add buttons to search by location, date added, rating, number of comments. 
  
- Add transition zoom animation to map:       
  On the map page when clicking on a gem or searching for a location, when activated the map should smoothly transition to that location and zoom. Or even smooth zoom out and then move across the map to then zoom back in.
  
## Main Takeaways
- Working collaboratively as a group, using Github and planning out the each section of the site. 
- Being more confident in reading package documentation to implement features not as familiar to ourselves. 
- React framework fluency and implementation, now become one of my favourite systems to work with. 
