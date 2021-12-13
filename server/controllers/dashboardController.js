const client = require('../db');

const listFactories_get = async (req, res) => {
    const orderList = ['name', 'start_date', 'expiration_date', 'employee_number', 'special_member'];
    let orderType = 'id';
    if(req.body.orderType && orderList.includes(req.body.orderType)) {
        orderType = req.body.orderType;
    }
    try {
        let result = await client.query(`SELECT * FROM public.factories ORDER BY ${orderType} ASC`);
        res.status(200).json({
            data: result.rows
        });
    } catch(err) {
        res.status(400).json({
            error: err
        });
    }
}

const addFactory_post = async (req, res) => {
    // format of fields and values
    // fields -> (name, start_date, expiration_date, employee_number, special_member)
    const fields = Object.keys(req.body).join(',');
    // values -> ('${name}', '${start_date}', '${expiration_date}', '${+employee_number}', '${special_member}');
    const values = Object.values(req.body).map(value => `'${value}'`).join(',');

    try {
        let result = await client.query(`INSERT INTO public.factories(${fields}) VALUES (${values});`);
        res.status(200).json({
            info: "Factory information received",
            result
        });
    } catch(err) {
        res.status(400).json({
            error: err
        });
    }
}

const updateFactory_put = async (req, res) => {
    const body = req.body
    const id = body.id;

    const fields = Object.keys(body).filter(key => key !== 'id');
    const updateArea = fields.map(key => `${key} = '${body[key]}'`).join(', ');

    console.log(updateArea);

    try {
        let result = await client.query(`UPDATE public.factories SET ${updateArea} WHERE id=${id};`);

        res.status(200).json({
            info: "Factory information updated",
            result
        });
    } catch(err) {
        res.status(400).json({
            error: err
        });
    }
}

const deleteFactory_delete = async (req, res) => {
    const id = req.body.id;

    try {
        let result = await client.query(`DELETE FROM public.factories WHERE id=${id}`);
        
        if(result.rowCount > 0) {
            res.status(200).json({
                info: "Factory information deleted",
                result
            });
        } else {
            throw 'This factory is not available in the list';
        }
    } catch(err) {
        res.status(400).json({
            error: err
        });
    }
}

module.exports = {
    listFactories_get,
    addFactory_post,
    updateFactory_put,
    deleteFactory_delete
}