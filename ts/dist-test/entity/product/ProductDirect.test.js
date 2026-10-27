"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ProductDirect', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when PEPTIDE_LIBRARY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('PEPTIDE_LIBRARY_TEST_LIVE'));
    (0, node_test_1.test)('direct-exists', async () => {
        const sdk = new __1.PeptideLibrarySDK({
            base: 'http://localhost:8080',
            system: { fetch: async () => ({}) }
        });
        (0, node_assert_1.default)('function' === typeof sdk.direct);
        (0, node_assert_1.default)('function' === typeof sdk.prepare);
    });
    (0, node_test_1.test)('direct-load-product', async (t) => {
        if (liveScenariosActive()) {
            t.skip('Covered by live operation scenarios');
            return;
        }
        const setup = directSetup({ id: 'direct01' });
        if ((0, utility_1.maybeSkipControl)(t, 'direct', 'direct-load-product', setup.live))
            return;
        const { client, calls } = setup;
        const params = {};
        const query = {};
        if (setup.live) {
            params.id = "bpc-157::vial";
        }
        else {
            params.id = 'direct01';
        }
        const result = await client.direct({
            path: 'products/{id}',
            method: 'GET',
            params,
            query,
        });
        if (setup.live) {
            if (!result.ok || result.status < 200 || result.status >= 300) {
                return void (0, utility_1.liveMiss)(t, LIVE_STRICT, 'Live load failed: ' + (0, utility_1.describeLive)(result));
            }
            if (!(null != result.data)) {
                return void (0, utility_1.liveMiss)(t, LIVE_STRICT, 'Live load returned no data: ' + (0, utility_1.describeLive)(result));
            }
        }
        else {
            (0, node_assert_1.default)(result.ok === true);
            (0, node_assert_1.default)(result.status === 200);
            (0, node_assert_1.default)(null != result.data);
            (0, node_assert_1.default)(result.data.id === 'direct01');
            (0, node_assert_1.default)(calls.length === 1);
            (0, node_assert_1.default)(calls[0].init.method === 'GET');
            (0, node_assert_1.default)(calls[0].url.includes('direct01'));
        }
    });
    (0, node_test_1.test)('direct-list-product', async (t) => {
        if (liveScenariosActive()) {
            t.skip('Covered by live operation scenarios');
            return;
        }
        const setup = directSetup([{ id: 'direct01' }, { id: 'direct02' }]);
        if ((0, utility_1.maybeSkipControl)(t, 'direct', 'direct-list-product', setup.live))
            return;
        const { client, calls } = setup;
        const params = {};
        const query = {};
        const result = await client.direct({
            path: 'products',
            method: 'GET',
            params,
            query,
        });
        if (setup.live) {
            if (!result.ok || result.status < 200 || result.status >= 300) {
                return void (0, utility_1.liveMiss)(t, LIVE_STRICT, 'Live list failed: ' + (0, utility_1.describeLive)(result));
            }
            if (!(Array.isArray(unwrapListData(result.data)))) {
                return void (0, utility_1.liveMiss)(t, LIVE_STRICT, 'Live list returned no list: ' + (0, utility_1.describeLive)(result));
            }
        }
        else {
            (0, node_assert_1.default)(result.ok === true);
            (0, node_assert_1.default)(result.status === 200);
            (0, node_assert_1.default)(null != result.data);
            const listArr = unwrapListData(result.data);
            (0, node_assert_1.default)(Array.isArray(listArr));
            (0, node_assert_1.default)(listArr.length === 2);
            (0, node_assert_1.default)(calls.length === 1);
            (0, node_assert_1.default)(calls[0].init.method === 'GET');
        }
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function liveScenariosActive() { return false && process.env.PEPTIDE_LIBRARY_TEST_LIVE === 'TRUE'; }
function directSetup(mockres) {
    const calls = [];
    const env = (0, utility_1.envOverride)({
        'PEPTIDE_LIBRARY_TEST_PRODUCT_ENTID': {},
        'PEPTIDE_LIBRARY_TEST_LIVE': 'FALSE',
        'PEPTIDE_LIBRARY_APIKEY': '',
    });
    const live = 'TRUE' === env.PEPTIDE_LIBRARY_TEST_LIVE;
    if (live) {
        const transport = (0, live_runner_1.createLiveTransport)();
        // Merged so the generated fields win: sdk-test-control.json's
        // test.client.options adds to the live client, it does not redirect it.
        const client = new __1.PeptideLibrarySDK(Object.assign({}, (0, utility_1.liveClientOptions)(), { system: { fetch: transport.fetch },
            apikey: env.PEPTIDE_LIBRARY_APIKEY,
        }));
        let idmap = env['PEPTIDE_LIBRARY_TEST_PRODUCT_ENTID'];
        if ('string' === typeof idmap && idmap.startsWith('{')) {
            idmap = JSON.parse(idmap);
        }
        // A path parameter's example stands in for an id *_ENTID does not give.
        idmap = Object.assign({ product01: 'bpc-157::vial' }, 'object' === typeof idmap ? idmap : {});
        return { client, calls, live, idmap, transport };
    }
    const mockFetch = async (url, init) => {
        calls.push({ url, init });
        return {
            status: 200,
            statusText: 'OK',
            headers: {},
            json: async () => (null != mockres ? mockres : { id: 'direct01' }),
        };
    };
    const client = new __1.PeptideLibrarySDK({
        base: 'http://localhost:8080',
        system: { fetch: mockFetch },
    });
    return { client, calls, live, idmap: {} };
}
// direct() returns the raw response body. List endpoints often wrap the
// array in an envelope (e.g. { data: [...] }, { entities: [...] },
// { pagination, data: [...] }). The test transforms the raw body to
// extract the first array — either the body itself or the first array
// property of an envelope object.
function unwrapListData(data) {
    if (Array.isArray(data))
        return data;
    if (data && 'object' === typeof data) {
        for (const v of Object.values(data)) {
            if (Array.isArray(v))
                return v;
        }
    }
    return null;
}
//# sourceMappingURL=ProductDirect.test.js.map