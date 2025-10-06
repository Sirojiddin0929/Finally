import { Pool } from "pg"
const pool = new Pool({
    user: "postgres",
    host : "localhost",
    database: "sirojiddin",
    password:"12345",
    port: 5432
}
)
export const players = {
    get : async function(req, res){
    try{
        const info = await pool.query(`SELECT * FROM players;`);
        res.json(info.rows)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Database error"})
    }
    },
    post : async function(req, res){
        try{
            const {full_name, date_of_birth, position, team_id, jersey_number} = req.body;
            if(!full_name || !date_of_birth || !position || !team_id || !jersey_number){
                return res.status(404).json({message: 'Malumotlar toliq emas'})
            }            
            const info = await pool.query(`INSERT INTO players(full_name, date_of_birth, position, team_id, jersey_number)
                VALUES($1, $2, $3, $4, $5) RETURNING *`,
            [full_name, date_of_birth, position, team_id, jersey_number]
            );
            res.json(info.rows)
        }
        catch(err){
            console.log(err)
            res.status(500).json({message: "Database error"})
        }
    },
    put : async function(req, res){
        try{
            const fields = []
            const values = []
        let idx = 1

        for (const [key, value] of Object.entries(req.body)) {
            fields.push(`${key}=$${idx}`)
            values.push(value)
            idx++
        }
        if (fields.length === 0) {
            return res.status(400).json({ message: "Hech qanday o'zgarish yuborilmadi" });
        }
         fields.push(`updated_at=NOW()`);
        values.push(req.params.id)

        const result = await pool.query(
            `UPDATE players SET ${fields.join(", ")} WHERE id=$${idx} RETURNING *`, values
        )
        res.json({ message: "Successfully updated", user: result.rows[0] });
        }
        catch(err){
            console.log(err)
            res.status(500).json({message: "Database error"})
        }
    },
    delete : async function(req, res){
        try{
            const {id} = req.params
            const info = await pool.query(`DELETE FROM players where id=$1 RETURNING *`, [id])
            res.json({ message: "Match o'chirildi", deleted: info.rows });
        }
        catch(err){
            console.log(err)
            res.status(500).json({message: "Database error"})
        }
    } 
}