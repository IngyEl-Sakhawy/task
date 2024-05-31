const axios = require('axios');

const email = 'ingy.mahmoud.elsakhawy@gmail.com';
const generateApiKeyUrl = 'https://mytask.enozom.com/BackEnd/api/GenerateAPIKey';
const getMyTaskUrl = 'https://mytask.enozom.com/BackEnd/api/GetMyTask';
const submitResultUrl = 'https://mytask.enozom.com/BackEnd/api/SubmitResult';

async function getApiKey(email) {
    try {
        const response = await axios.post(generateApiKeyUrl, { Email: email }, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error('Error generating API key:', error);
    }
}


async function getTaskDetails(apiKey) {
    try {
        const response = await axios.get(getMyTaskUrl, {
            headers: { 'x-api-key': apiKey }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting task details:', error);
    }
}


function extractPassword(indexes, text) {
    const indexArray = indexes.split(',').map(Number);
    const password = indexArray.map(index => text[index]).join('');
    return password;
}


async function submitResult(password) {
    try {
        const response = await axios.post(submitResultUrl, { Password: password }, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error('Error submitting result:', error);
    }
}

(async function main() {
    try {
        
        const apiKey = await getApiKey(email);
        console.log('API Key:', apiKey);

        
        const taskDetails = await getTaskDetails(apiKey);
        console.log('Task Details:', taskDetails);

        
        const password = extractPassword(taskDetails.Indexes, taskDetails.Text);
        console.log('Password:', password);

        
        const result = await submitResult(password);
        console.log('Submission Result:', result);
    } catch (error) {
        console.error('Error in main function:', error);
    }
})();
