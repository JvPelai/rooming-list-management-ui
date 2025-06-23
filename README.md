You need to set up the backend first in order to create and fetch rooming lists:

See: [rooming-list-management-api](https://github.com/JvPelai/rooming-list-management-api)

Follow instructions to register a user and login to get an api token, for now this needs to be done through postman or curl, since a signup/signin page is still not implemented

Change the variable `REACT_APP_API_TOKEN` in the `.env` with the jwt_token from the api response.

Change the variable in the `docker-compose.yml` file as well if you want to run it with docker.

### `npm start`

OR, if you want to run with docker:

### `docker-compose up --build`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.



## Insert data:

![Captura de tela 2025-06-23 121501](https://github.com/user-attachments/assets/4161b628-e784-4487-9a88-95f813d5a18d)

The buttown shown above clears all existing data and inserts the data from the following files:

- [src/data/bookings.json](src/data/bookings.json)
- [src/data/rooming-ist.json](src/data/rooming-lists.json)
- [src/data/rooming-list-bookings.json](src/data/rooming-list-bookings.json)


## Initial page: Rooming Lists grouped by event name:

![Captura de tela 2025-06-23 131059](https://github.com/user-attachments/assets/8a7e903c-f890-48ba-836e-a0a60b6a9468)


You can search items by rfp name, agrement type and status. With a 500ms debounce

### Filter options:

![Captura de tela 2025-06-23 121407](https://github.com/user-attachments/assets/ac0ea41e-4446-4579-b581-58902478a0af)

For now, it included all statuses present in [src/data/rooming-ist.json](src/data/rooming-lists.json), this is only to display all items in the file to facilitate testing and not the final version.

### Bookings list:

![Captura de tela 2025-06-23 121601](https://github.com/user-attachments/assets/28c362e8-48c7-4282-b03f-2e9f5e918ae0)

Each Rooming Card has its respective bookings, displayed in a modal when the "View Bookings" button is clicked.




