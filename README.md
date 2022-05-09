# Lisbon

## Abstract

Easy Time Tracking Application


## Team

| Name                | Student ID |
| ------------------- | ---------- |
| Chritos Malliaridis | cm116      |
| Lukas Klein         | lk104      |



## Milestones

| Date       | Milestone                             |
| ---------- | ------------------------------------- |
| 24.04.2020 | Kick-Off (Online Webinar)             |
| 22.05.2020 | Mid-Term-Session                      |
| 26.05.2020 | Backend Implementation                |
| 29.05.2020 | Frontend Preparation                  |
| 16.06.2020 | Frontend Implementation               |
| 16.06.2020 | Project Completion                    |
| 19.06.2020 | Project Presentation (Online Webinar) |


## Tech-Stack

### Frontend

* Angular CLI with Angular Material UI component library

### Backend

* NodeJS (with ExpressJS)
* API: REST
* Database: MongoDB

### Testing

* Integration-Tests: Mocha and Chai


## Run project

1. First start the project with `docker-compose up`
2. Then open the web application in the browser at `http://localhost:4200`

## Tests

To run the tests or the backend separately a mongo database connection is required. To define a database location create a `.env` file in the `backend` directory with at least a database URL. See for options `.env.example`.

Run the tests:

```
npm run test
```

Run test coverage:

```
npm run coverage
```

Create HTML coverage:

```
npm run coverage:report
```