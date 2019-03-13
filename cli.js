#!/usr/bin/env node
const request = require('./utils/request');
var StatusTypes;
(function (StatusTypes) {
    StatusTypes[StatusTypes["New"] = 1] = "New";
    StatusTypes[StatusTypes["PendingApproval"] = 2] = "PendingApproval";
    StatusTypes[StatusTypes["ApprovedForAutomation"] = 3] = "ApprovedForAutomation";
    StatusTypes[StatusTypes["PendingAutomation"] = 4] = "PendingAutomation";
    StatusTypes[StatusTypes["Automated"] = 5] = "Automated";
    StatusTypes[StatusTypes["AutomatedAPI"] = 16] = "AutomatedAPI";
    StatusTypes[StatusTypes["Rejected"] = 6] = "Rejected";
    StatusTypes[StatusTypes["AutomationInProgress"] = 7] = "AutomationInProgress";
    StatusTypes[StatusTypes["Cancelled"] = 8] = "Cancelled";
    StatusTypes[StatusTypes["ApprovedForTesting"] = 9] = "ApprovedForTesting";
    StatusTypes[StatusTypes["DefinitionInProgress"] = 10] = "DefinitionInProgress";
    StatusTypes[StatusTypes["PendingReview"] = 11] = "PendingReview";
    StatusTypes[StatusTypes["InReview"] = 12] = "InReview";
    StatusTypes[StatusTypes["Automated_JRF"] = 13] = "Automated_JRF";
})(StatusTypes || (StatusTypes = {}));

/*put test cases to update ids here*/
const testIds=[16025261];
let login = process.env.TR_LOGIN;
let password = process.env.TR_PASS;
if(!login || !password){
    console.log("set up TR_LOGIN and TR_PASS environment variables");
    process.exit(0);
}
for (let caseIdIndex = 0; caseIdIndex < testIds.length; caseIdIndex++) {
    const options = {
        host: 'testrail.devfactory.com',
        path: `/index.php?/api/v2/update_case/${testIds[caseIdIndex]}`,
        headers: {
            'Authorization': 'Basic ' + Buffer.from(login + ":" + password).toString('base64'),
            'Content-Type': 'application/json'
        }
    };
    request.post(options, {custom_tc_status: StatusTypes.ApprovedForTesting}, () => {
        console.log(`Done ${testIds[caseIdIndex]}`);
    });
}


