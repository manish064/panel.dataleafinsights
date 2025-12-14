const http = require('http');

const BASE_URL = 'http://localhost:5000';

// Helper function to make HTTP requests
function makeRequest(method, path, data = null, token = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, BASE_URL);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 10000
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    const jsonBody = JSON.parse(body);
                    resolve({ status: res.statusCode, data: jsonBody });
                } catch {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });

        req.on('error', (err) => reject(err));
        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function testEndpoints() {
    console.log('🚀 Starting API Endpoint Tests\n');
    console.log('='.repeat(60));

    const results = [];
    let userToken = null;
    let adminToken = null;

    // ========== 1. HEALTH CHECK ==========
    console.log('\n📌 Test 1: Health Check');
    try {
        const res = await makeRequest('GET', '/health');
        const passed = res.status === 200 && res.data.status === 'OK';
        console.log(passed ? '   ✅ PASSED' : '   ❌ FAILED', `- Status: ${res.status}`);
        results.push({ name: 'Health Check', passed, status: res.status });
    } catch (err) {
        console.log('   ❌ FAILED -', err.message);
        results.push({ name: 'Health Check', passed: false, error: err.message });
    }

    // ========== 2. AUTH - LOGIN (User) ==========
    console.log('\n📌 Test 2: User Login');
    try {
        const res = await makeRequest('POST', '/auth/login', {
            email: 'demo@credencuesta.com',
            password: 'demo123'
        });
        const passed = res.status === 200 && res.data.success;
        if (passed && res.data.token) {
            userToken = res.data.token;
            console.log('   ✅ PASSED - Got auth token');
        } else {
            console.log('   ⚠️  PARTIAL -', res.data.message || 'No token received');
        }
        results.push({ name: 'User Login', passed, status: res.status, message: res.data.message });
    } catch (err) {
        console.log('   ❌ FAILED -', err.message);
        results.push({ name: 'User Login', passed: false, error: err.message });
    }

    // ========== 3. AUTH - ADMIN LOGIN ==========
    console.log('\n📌 Test 3: Admin Login');
    try {
        const res = await makeRequest('POST', '/api/admin/login', {
            email: 'admin@credencuesta-panel.com',
            password: '12345678'
        });
        const passed = res.status === 200 && res.data.success;
        if (passed && res.data.data?.token) {
            adminToken = res.data.data.token;
            console.log('   ✅ PASSED - Got admin token');
        } else {
            console.log('   ⚠️  PARTIAL -', res.data.message || 'No admin token');
        }
        results.push({ name: 'Admin Login', passed, status: res.status, message: res.data.message });
    } catch (err) {
        console.log('   ❌ FAILED -', err.message);
        results.push({ name: 'Admin Login', passed: false, error: err.message });
    }

    // ========== 4. USER PROFILE ==========
    console.log('\n📌 Test 4: Get User Profile');
    try {
        if (!userToken) {
            console.log('   ⏭️  SKIPPED - No user token available');
            results.push({ name: 'Get User Profile', passed: false, skipped: true });
        } else {
            const res = await makeRequest('GET', '/users/profile', null, userToken);
            const passed = res.status === 200 && res.data.success;
            console.log(passed ? '   ✅ PASSED' : '   ❌ FAILED', `- Status: ${res.status}`);
            results.push({ name: 'Get User Profile', passed, status: res.status });
        }
    } catch (err) {
        console.log('   ❌ FAILED -', err.message);
        results.push({ name: 'Get User Profile', passed: false, error: err.message });
    }

    // ========== 5. USER DASHBOARD ==========
    console.log('\n📌 Test 5: Get User Dashboard');
    try {
        if (!userToken) {
            console.log('   ⏭️  SKIPPED - No user token available');
            results.push({ name: 'Get User Dashboard', passed: false, skipped: true });
        } else {
            const res = await makeRequest('GET', '/users/dashboard', null, userToken);
            const passed = res.status === 200 && res.data.success;
            console.log(passed ? '   ✅ PASSED' : '   ❌ FAILED', `- Status: ${res.status}`);
            if (passed) {
                console.log(`   📊 Stats: ${res.data.dashboard?.stats?.totalSurveys || 0} surveys, ${res.data.dashboard?.stats?.currentPoints || 0} points`);
            }
            results.push({ name: 'Get User Dashboard', passed, status: res.status });
        }
    } catch (err) {
        console.log('   ❌ FAILED -', err.message);
        results.push({ name: 'Get User Dashboard', passed: false, error: err.message });
    }

    // ========== 6. GET SURVEYS (Authenticated) ==========
    console.log('\n📌 Test 6: Get Surveys (Authenticated)');
    try {
        if (!userToken) {
            console.log('   ⏭️  SKIPPED - No user token available');
            results.push({ name: 'Get Surveys', passed: false, skipped: true });
        } else {
            const res = await makeRequest('GET', '/surveys', null, userToken);
            const passed = res.status === 200 && res.data.success;
            console.log(passed ? '   ✅ PASSED' : '   ❌ FAILED', `- Status: ${res.status}`);
            if (passed) {
                console.log(`   📋 Available surveys: ${res.data.surveys?.length || 0}`);
            }
            results.push({ name: 'Get Surveys', passed, status: res.status });
        }
    } catch (err) {
        console.log('   ❌ FAILED -', err.message);
        results.push({ name: 'Get Surveys', passed: false, error: err.message });
    }

    // ========== 7. GET PUBLIC SURVEYS ==========
    console.log('\n📌 Test 7: Get Public Surveys (No Auth)');
    try {
        const res = await makeRequest('GET', '/surveys/public/list');
        const passed = res.status === 200 && res.data.success;
        console.log(passed ? '   ✅ PASSED' : '   ❌ FAILED', `- Status: ${res.status}`);
        if (passed) {
            console.log(`   📋 Public surveys: ${res.data.data?.length || 0}`);
        }
        results.push({ name: 'Get Public Surveys', passed, status: res.status });
    } catch (err) {
        console.log('   ❌ FAILED -', err.message);
        results.push({ name: 'Get Public Surveys', passed: false, error: err.message });
    }

    // ========== 8. GET REWARDS ==========
    console.log('\n📌 Test 8: Get Rewards');
    try {
        if (!userToken) {
            console.log('   ⏭️  SKIPPED - No user token available');
            results.push({ name: 'Get Rewards', passed: false, skipped: true });
        } else {
            const res = await makeRequest('GET', '/users/rewards', null, userToken);
            const passed = res.status === 200 && res.data.success;
            console.log(passed ? '   ✅ PASSED' : '   ❌ FAILED', `- Status: ${res.status}`);
            if (passed) {
                console.log(`   🎁 Available rewards: ${res.data.rewards?.length || 0}`);
            }
            results.push({ name: 'Get Rewards', passed, status: res.status });
        }
    } catch (err) {
        console.log('   ❌ FAILED -', err.message);
        results.push({ name: 'Get Rewards', passed: false, error: err.message });
    }

    // ========== 9. ADMIN DASHBOARD ==========
    console.log('\n📌 Test 9: Admin Dashboard');
    try {
        if (!adminToken) {
            console.log('   ⏭️  SKIPPED - No admin token available');
            results.push({ name: 'Admin Dashboard', passed: false, skipped: true });
        } else {
            const res = await makeRequest('GET', '/api/admin/dashboard/stats', null, adminToken);
            const passed = res.status === 200 && res.data.success;
            console.log(passed ? '   ✅ PASSED' : '   ❌ FAILED', `- Status: ${res.status}`);
            if (passed && res.data.data) {
                console.log(`   📊 Total Users: ${res.data.data.totalUsers || 0}, Surveys: ${res.data.data.totalSurveys || 0}`);
            }
            results.push({ name: 'Admin Dashboard', passed, status: res.status });
        }
    } catch (err) {
        console.log('   ❌ FAILED -', err.message);
        results.push({ name: 'Admin Dashboard', passed: false, error: err.message });
    }

    // ========== 10. ADMIN GET USERS ==========
    console.log('\n📌 Test 10: Admin Get Users');
    try {
        if (!adminToken) {
            console.log('   ⏭️  SKIPPED - No admin token available');
            results.push({ name: 'Admin Get Users', passed: false, skipped: true });
        } else {
            const res = await makeRequest('GET', '/api/admin/users', null, adminToken);
            const passed = res.status === 200 && res.data.success;
            console.log(passed ? '   ✅ PASSED' : '   ❌ FAILED', `- Status: ${res.status}`);
            if (passed) {
                console.log(`   👥 Users found: ${res.data.data?.users?.length || res.data.pagination?.total || 0}`);
            }
            results.push({ name: 'Admin Get Users', passed, status: res.status });
        }
    } catch (err) {
        console.log('   ❌ FAILED -', err.message);
        results.push({ name: 'Admin Get Users', passed: false, error: err.message });
    }

    // ========== 11. ADMIN GET SURVEYS ==========
    console.log('\n📌 Test 11: Admin Get Surveys');
    try {
        if (!adminToken) {
            console.log('   ⏭️  SKIPPED - No admin token available');
            results.push({ name: 'Admin Get Surveys', passed: false, skipped: true });
        } else {
            const res = await makeRequest('GET', '/api/admin/surveys', null, adminToken);
            const passed = res.status === 200 && res.data.success;
            console.log(passed ? '   ✅ PASSED' : '   ❌ FAILED', `- Status: ${res.status}`);
            if (passed) {
                console.log(`   📋 Surveys found: ${res.data.data?.surveys?.length || res.data.pagination?.total || 0}`);
            }
            results.push({ name: 'Admin Get Surveys', passed, status: res.status });
        }
    } catch (err) {
        console.log('   ❌ FAILED -', err.message);
        results.push({ name: 'Admin Get Surveys', passed: false, error: err.message });
    }

    // ========== 12. ADMIN GET REWARDS ==========
    console.log('\n📌 Test 12: Admin Get Rewards');
    try {
        if (!adminToken) {
            console.log('   ⏭️  SKIPPED - No admin token available');
            results.push({ name: 'Admin Get Rewards', passed: false, skipped: true });
        } else {
            const res = await makeRequest('GET', '/api/admin/rewards', null, adminToken);
            const passed = res.status === 200 && res.data.success;
            console.log(passed ? '   ✅ PASSED' : '   ❌ FAILED', `- Status: ${res.status}`);
            results.push({ name: 'Admin Get Rewards', passed, status: res.status });
        }
    } catch (err) {
        console.log('   ❌ FAILED -', err.message);
        results.push({ name: 'Admin Get Rewards', passed: false, error: err.message });
    }

    // ========== 13. ADMIN GET WITHDRAWALS ==========
    console.log('\n📌 Test 13: Admin Get Withdrawals');
    try {
        if (!adminToken) {
            console.log('   ⏭️  SKIPPED - No admin token available');
            results.push({ name: 'Admin Get Withdrawals', passed: false, skipped: true });
        } else {
            const res = await makeRequest('GET', '/api/admin/withdrawals', null, adminToken);
            const passed = res.status === 200 && res.data.success;
            console.log(passed ? '   ✅ PASSED' : '   ❌ FAILED', `- Status: ${res.status}`);
            results.push({ name: 'Admin Get Withdrawals', passed, status: res.status });
        }
    } catch (err) {
        console.log('   ❌ FAILED -', err.message);
        results.push({ name: 'Admin Get Withdrawals', passed: false, error: err.message });
    }

    // ========== 14. 404 TEST ==========
    console.log('\n📌 Test 14: 404 Handler');
    try {
        const res = await makeRequest('GET', '/nonexistent-route');
        const passed = res.status === 404;
        console.log(passed ? '   ✅ PASSED' : '   ❌ FAILED', `- Status: ${res.status}`);
        results.push({ name: '404 Handler', passed, status: res.status });
    } catch (err) {
        console.log('   ❌ FAILED -', err.message);
        results.push({ name: '404 Handler', passed: false, error: err.message });
    }

    // ========== SUMMARY ==========
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(60));

    const passed = results.filter(r => r.passed).length;
    const failed = results.filter(r => !r.passed && !r.skipped).length;
    const skipped = results.filter(r => r.skipped).length;

    console.log(`\n✅ Passed:  ${passed}/${results.length}`);
    console.log(`❌ Failed:  ${failed}/${results.length}`);
    console.log(`⏭️  Skipped: ${skipped}/${results.length}`);

    console.log('\n📋 Detailed Results:');
    results.forEach((r, i) => {
        const icon = r.skipped ? '⏭️ ' : (r.passed ? '✅' : '❌');
        console.log(`   ${i + 1}. ${icon} ${r.name} ${r.status ? `(${r.status})` : ''}`);
    });

    console.log('\n🎉 API Endpoint Testing Complete!\n');
}

// Wait for server to be ready then run tests
console.log('⏳ Waiting for server to be ready...\n');
testEndpoints().catch(err => {
    console.error('Test failed:', err.message);
    console.log('\n⚠️  Make sure the server is running on port 5000');
});
