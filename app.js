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
        console.log('API Key Response:', response.data);
        return response.data.ApiKey;
    } catch (error) {
        console.error('Error generating API key:', error);
    }
}

async function getTaskDetails(apiKey) {
    try {
        const response = await axios.get(getMyTaskUrl, {
            headers: { 'x-api-key': apiKey }
        });
        console.log('Task Details Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting task details:', error);
    }
}

function calculateTaxes(salaries) {
    return salaries.map(salary => {
        let tax = 0;

        if (salary <= 40000) {
            tax = 0;
        } else if (salary <= 55000) {
            tax = (salary - 40000) * 0.10;
        } else if (salary <= 70000) {
            tax = (55000 - 40000) * 0.10 + (salary - 55000) * 0.15;
        } else if (salary <= 200000) {
            tax = (55000 - 40000) * 0.10 + (70000 - 55000) * 0.15 + (salary - 70000) * 0.20;
        } else if (salary <= 400000) {
            tax = (55000 - 40000) * 0.10 + (70000 - 55000) * 0.15 + (200000 - 70000) * 0.20 + (salary - 200000) * 0.225;
        } else if (salary <= 1200000) {
            tax = (55000 - 40000) * 0.10 + (70000 - 55000) * 0.15 + (200000 - 70000) * 0.20 + (400000 - 200000) * 0.225 + (salary - 400000) * 0.25;
        } else {
            tax = (55000 - 40000) * 0.10 + (70000 - 55000) * 0.15 + (200000 - 70000) * 0.20 + (400000 - 200000) * 0.225 + (1200000 - 400000) * 0.25 + (salary - 1200000) * 0.275;
        }

        return tax;
    });
}

async function submitResult(apiKey, salariesTax) {
    try {
        const response = await axios.post(submitResultUrl, { Result: salariesTax } , {
            headers: { 
                
                'x-api-key': apiKey 
            }
        });
        console.log('Submission Response:', response.data);
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

        
        const salaries = JSON.parse(taskDetails.Text);
        const taxes = calculateTaxes(salaries);
        const salariesTax=JSON.stringify(taxes);
        console.log('Taxes:', taxes);

        
        const result = await submitResult(apiKey, salariesTax);
        console.log('Submission Result:', result);
    } catch (error) {
        console.error('Error in main function:', error);
    }
})();
