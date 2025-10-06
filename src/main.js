import express from "express"
import {footballClubsRouter, matchFixtureRouter, 
    playersRouter, teamsRouter, tournamentGroupsRouter, tournamentsRouter
} from "./router/index.js"
const app = express()
app.use(express.json());


app.use("/tournament-groups", tournamentGroupsRouter);
app.use("/tournaments", tournamentsRouter);
app.use("/players", playersRouter);
app.use("/teams", teamsRouter);
app.use("/match-fixtures", matchFixtureRouter);
app.use("/football-clubs", footballClubsRouter);


app.listen(4000, () => console.log("Server running on port 4000"));