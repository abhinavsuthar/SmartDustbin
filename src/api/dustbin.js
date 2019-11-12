const getDustbins = (req, res, dbs) => {
  const query = req.query | {}
  const collection = dbs.production.collection('dustbin')
  collection.find(query)
      .toArray((err, result) => {
        if (err) throw err
        res.send({
          success: true,
          data: result
        })
      })
}

module.exports = {getDustbins}
