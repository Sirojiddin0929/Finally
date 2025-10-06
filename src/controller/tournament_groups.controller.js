import { Pool } from "pg"
const pool = new Pool({
    user: "postgres",
    host : "localhost",
    database: "sirojiddin",
    password:"12345",
    port: 5432
}
)
export const tournament_groups = {
    get : async function(req, res){
    try{
        const info = await pool.query(`SELECT * FROM tournament_groups;`);
        res.json(info.rows)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Database error"})
    }
    },
    post : async function(req, res){
        try{
            const {group_name, tournament_id} = req.body;
            if(!group_name || !tournament_id){
                return res.status(404).json({message: 'Malumotlar toliq emas'})
            }            
            const info = await pool.query(`INSERT INTO tournament_groups(group_name, tournament_id)
                VALUES($1, $2) RETURNING *`,
            [group_name, tournament_id]
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
            `UPDATE tournament_groups SET ${fields.join(", ")} WHERE id=$${idx} RETURNING *`, values
        )
        res.json({ message: "Successfully updated", group: result.rows[0] });
        }
        catch(err){
            console.log(err)
            res.status(500).json({message: "Database error"})
        }
    },
    delete : async function(req, res){
        try{
            const {id} = req.params
            const info = await pool.query(`DELETE FROM tournament_groups where id=$1 RETURNING *`, [id])
            res.json({ message: "Match o'chirildi", deleted: info.rows });
        }
        catch(err){
            console.log(err)
            res.status(500).json({message: "Database error"})
        }
    } 
}