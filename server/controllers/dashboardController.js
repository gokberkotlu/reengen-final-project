const client = require('../db');

// factories database methods
const listFactories_get = async (req, res) => {
    const orderList = ['name', 'start_date', 'expiration_date', 'employee_number', 'special_member'];
    let orderType = 'id';
    if(req.body.orderType && orderList.includes(req.body.orderType)) {
        orderType = req.body.orderType;
    }
    try {
        let result = await client.query(`SELECT * FROM public.factories ORDER BY ${orderType} ASC`);
        res.status(200).json(result.rows);
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
    // values -> ('${name}', '${start_date}', '${expiration_date}', '${employee_number}', '${special_member}');
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


// *********************************************************************************************************************************** //


// factory-details database methods
const listFactoryDetails_get = async (req, res) => {
    const orderList = ['name', 'departmant', 'date_range', 'consumption', 'invoice', 'discount'];
    let orderType = 'id';
    if(req.body.orderType && orderList.includes(req.body.orderType)) {
        orderType = req.body.orderType;
    }
    try {
        let result = await client.query(`SELECT * FROM public.factory_details ORDER BY ${orderType} ASC`);
        res.status(200).json(result.rows);
    } catch(err) {
        res.status(400).json({
            error: err
        });
    }
}

const addFactoryDetails_post = async (req, res) => {
    // format of fields and values
    // fields -> (name, departmant, date_range, consumption, invoice, discount)
    const fields = Object.keys(req.body).join(',');
    // values -> ('${name}', '${departmant}', '${date_range}', '${consumption}', '${invoice}, '${discount}');
    const values = Object.values(req.body).map(value => `'${value}'`).join(',');

    try {
        let result = await client.query(`INSERT INTO public.factory_details(${fields}) VALUES (${values});`);
        res.status(200).json({
            info: "Factory details received",
            result
        });
    } catch(err) {
        res.status(400).json({
            error: err
        });
    }
}

const updateFactoryDetails_put = async (req, res) => {
    const body = req.body
    console.log(body);
    const id = body.id;

    const fields = Object.keys(body).filter(key => key !== 'id');
    const updateArea = fields.map(key => `${key} = '${body[key]}'`).join(', ');

    try {
        let result = await client.query(`UPDATE public.factory_details SET ${updateArea} WHERE id=${id};`);

        res.status(200).json({
            info: "Factory details updated",
            result
        });
    } catch(err) {
        console.log(err);
        res.status(400).json({
            error: err
        });
    }
}

const deleteFactoryDetails_delete = async (req, res) => {
    const id = req.body.id;

    try {
        let result = await client.query(`DELETE FROM public.factory_details WHERE id=${id}`);
        
        if(result.rowCount > 0) {
            res.status(200).json({
                info: "Factory details deleted",
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
    // export factories database methods
    listFactories_get,
    addFactory_post,
    updateFactory_put,
    deleteFactory_delete,
    // export factory-details database methods
    listFactoryDetails_get,
    addFactoryDetails_post,
    updateFactoryDetails_put,
    deleteFactoryDetails_delete
}