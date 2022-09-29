# Maze Solver

Create an API (consuming and producing JSON) which allows users to register, persist mazes they create in the database and get solutions for those mazes. Please read the following instructions carefully, not following them will reflect negatively on your application. You should implement the necessary logic for the following flow:

1. [x] User registers via `POST /user` endpoint with the following fields:
       username (i.e. happyUser)
       password (i.e. iTk19!n)

2. [x] User logs in via `POST /login` endpoint

3. [x] The API creates a session and responds with a token

4. [x] From this point on all of the mentioned endpoints should require a valid token to be supplied

5. [x] User creates a maze via a `POST /maze` endpoint with the following fields:

    1. gridSize (size of a maze grid i.e. 10x10)
    2. walls (an array of cells which contain a wall within a given grid)
    3. entrance (the cell where the path should begin i.e. A1)
       Note: the grid uses capital letters for columns and numbers for rows (i.e. A1)

6. [ ] User sends a request to `GET /maze/{mazeId}/solution` endpoint with steps query parameter which can be either min or max

7. [ ] The API returns an array of grid cells leading from the entrance of the maze to the exit of the maze with the following rules:

    1. if steps parameter is min the API returns the path from the entrance to the exit with the least number of steps possible
    2. if steps parameter is max the API returns the path from the entrance to the exit with the most number of steps possible
    3. At each step, the API moves from one empty cell to an adjacent empty cell (horizontally or vertically, but not diagonally)

8. [x] User can see their created mazes by sending a request to `GET /maze` (the user should be able to see just their own mazes)
