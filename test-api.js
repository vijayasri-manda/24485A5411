const axios = require('axios');

async function testAPI() {
    try {
        console.log('Testing http://localhost:3000/notifications...\n');
        
        const response = await axios.get('http://localhost:3000/notifications');
        
        console.log('✓ Success! Status:', response.status);
        console.log('\nResponse:');
        console.log(JSON.stringify(response.data, null, 2));
        
    } catch (error) {
        console.error('✗ Error:', error.response?.data || error.message);
        console.log('\n⚠️  Make sure the server is running:');
        console.log('   cd notification_app_be');
        console.log('   node server.js');
    }
}

testAPI();
