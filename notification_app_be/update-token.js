const axios = require('axios');
const fs = require('fs');

async function getNewToken() {
    try {
        console.log('Fetching new authentication token...\n');
        
        const response = await axios.post('http://4.224.186.213/evaluation-service/auth', {
            email: "24485a5411@gecgudlavallerumec.in",
            name: "manda vijaya sri",
            rollNo: "24485a5411",
            accessCode: "eJdCuC",
            clientID: "3bcc0e39-447e-44f7-840f-1c1a270569d6",
            clientSecret: "UHabMWdFWdajexau"
        });

        const token = response.data.access_token;
        const expiresIn = response.data.expires_in;
        const expiryDate = new Date(expiresIn * 1000);
        
        console.log('✓ Token received successfully!');
        console.log('\nToken:', token);
        console.log('\nExpires at:', expiryDate.toLocaleString());
        console.log('\n' + '='.repeat(60));
        console.log('NEXT STEPS:');
        console.log('1. Copy the token above');
        console.log('2. Open notification_app_be/server.js');
        console.log('3. Replace the Authorization Bearer token');
        console.log('4. Restart the server: node server.js');
        console.log('='.repeat(60));
        
        // Save to file
        fs.writeFileSync('new-token.txt', token);
        console.log('\n✓ Token also saved to: new-token.txt\n');
        
    } catch (error) {
        console.error('✗ Error fetching token:');
        console.error(error.response?.data || error.message);
    }
}

getNewToken();
