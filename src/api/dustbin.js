const ObjectId = require('mongodb').ObjectID

const addNewDustbin = (req, res, dbs) => {
  const body = req.body
  console.log(body)

  const uRole = req.user.role
  if (uRole !== 'admin' && uRole !== 'editor') {
    return res.status(200).send({success: false, message: 'Only admin/editor can add new database. Try to login with a different user.'})
  }

  if (!body._id) return res.status(200).json({success: false, message: 'Please provide dustbin ID'})
  if (!body.pincode) return res.status(200).json({success: false, message: 'Please provide dustbin pincode'})
  if (!body.location || !body.location.lat || !body.location.lng)
    return res.status(200).json({success: false, message: 'Please provide valid dustbin location'})

  body._id = ObjectId(body._id)

  const collection = dbs.production.collection('dustbin')
  collection.insertOne(body, (err, response) => {
    if (err) return res.json({success: false, message: `${err}`})
    res.json({success: true, message: `Dustbin added with id ${response.insertedId}`, data: response})
  })
}

const getDustbins = (req, res, dbs) => {
  const query = {pincode: {$in: req.user.locations}}
  const projection = {history: {$slice: -10}}
  const collection = dbs.production.collection('dustbin')
  collection.find(query)
      .project(projection)
      .toArray((err, result) => {
        if (err) return res.json({success: false, message: `${err}`})
        res.send({success: true, data: result})
      })
}

const updateDustbinLevel = (req, res, dbs) => {
  const body = req.body
  const _id = body.id
  const level = body.level
  const timestamp = body.timestamp | Date.now()

  if (!_id || !level) {
    return res.status(200).json({success: false, message: 'Dustbin ID or level is null'})
  }

  const query = {_id: ObjectId(_id)};
  const value = {$set: {status: {timestamp: timestamp, level: level}}, $push: {history: {timestamp: timestamp, level: level}}}
  const collection = dbs.production.collection('dustbin')
  collection.updateOne(query, value, (err, response) => {
    if (err) return res.json({success: false, message: `${err}`})
    res.json({success: true, message: `Dustbin status updated with ID ${_id}`, data: response})
  })

}

module.exports = {addNewDustbin, getDustbins, updateDustbinLevel}
