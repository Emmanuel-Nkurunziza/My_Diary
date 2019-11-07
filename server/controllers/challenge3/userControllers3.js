import pool from '../../models/connect';
const Users = {
    async Create(req, res) {
        const createQuery = `INSERT INTO users(email, firstName, lastName, password)
        VALUES ($1,$2,$3,$4) returning *`;

        const Values = [
            req.body.email,
            req.body.firstName,
            req.body.lastName
        ];
        try{
            const {rows} = await pool.query(
               createQuery, Values 
            );
            return res.status(201).send({
                status: 201,
                message: 'User is successfully created',
                data: rows
            })
        }
        catch (error) {
            if (error.routine === '_bt_check_unique') {
                return res.status(409).send({
                    status: 409,
                    message: 'User with that Email already exists'
                  });
            }
        }
        return res.status(400).send({
            status: 400,
            message: 'Bad request!'
          });
    }
}
export default Users;