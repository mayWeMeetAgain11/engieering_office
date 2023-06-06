const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Database1, Database2 } = require('./models');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(require('./routes/authRoute'));
app.use(require('./routes/managerRoute'));
app.use(require('./routes/materialRoute'));
app.use(require('./routes/officeRoute'));
app.use(require('./routes/planRoute'));
app.use(require('./routes/projectRoute'));
app.use(require('./routes/engineerRoute'));
app.use(require('./routes/contractorRoute'));
app.use(require('./routes/workHoureRoute'));
app.use(require('./routes/categoryRoute'));
app.use(require('./routes/engineerAccountingRoute'));
app.use(require('./routes/stageRoute'));
app.use(require('./routes/contractorDocumentRoute'));
// app.use(require('./routes/contractorMainDocumentRoute'));
app.use(require('./routes/stageEngineerRoute'));
app.use(require('./routes/stageDocumentRoute'));
app.use(require('./routes/stageBillRoute'));
app.use(require('./routes/latencyRoute'));
app.use(require('./routes/latencyDocumentRoute'));
app.use(require('./routes/engineerOrderRoute'));
app.use(require('./routes/absenceOrderRoute'));

app.listen({ port: 3000}, async () => {
    // { focus: true }
    // await Database1.sync();
    // await Database2.sync();
    // await Database2.models.EvaluationOwnerMaterial.sync();
    await Database1.authenticate();
    await Database2.authenticate();
    console.log('starting');
});


