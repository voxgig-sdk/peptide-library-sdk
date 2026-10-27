"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ProductEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when PEPTIDE_LIBRARY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('PEPTIDE_LIBRARY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PeptideLibrarySDK.test();
        const ent = testsdk.Product();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('product hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.PeptideLibrarySDK.test(offline).Product().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.PeptideLibrarySDK.test(offline).Product()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.PeptideLibrarySDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Product().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.PeptideLibrarySDK.test().Product().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.PeptideLibrarySDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Product().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Product().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.PeptideLibrarySDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Product().list({ "category": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.PEPTIDE_LIBRARY_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'product.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "api_url": { "a": true, "h": "Api Url", "n": "api_url", "r": true, "sh": "Absolute URL.", "t": "`$STRING`", "key$": "api_url", "index$": 0 }, "form": { "a": true, "h": "Form", "n": "form", "r": true, "t": "`$STRING`", "key$": "form", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Compound and form, e.g.", "t": "`$STRING`", "key$": "id", "index$": 2 }, "in_stock_count": { "a": true, "h": "In Stock Count", "n": "in_stock_count", "r": true, "t": "`$INTEGER`", "key$": "in_stock_count", "index$": 3 }, "last_seen_at": { "a": true, "h": "Last Seen At", "n": "last_seen_at", "r": true, "t": "`$ANY`", "key$": "last_seen_at", "index$": 4 }, "offer_count": { "a": true, "h": "Offer Count", "n": "offer_count", "r": true, "t": "`$INTEGER`", "key$": "offer_count", "index$": 5 }, "offers": { "a": true, "h": "Offers", "n": "offers", "r": true, "sh": "With the `pricing:read` scope; otherwise null.", "t": "`$ANY`", "key$": "offers", "index$": 6 }, "peptide": { "a": true, "h": "Peptide", "n": "peptide", "r": true, "t": "`$OBJECT`", "key$": "peptide", "index$": 7 }, "prices": { "a": true, "h": "Prices", "n": "prices", "r": true, "sh": "Per currency, never converted or mixed.", "t": "`$ARRAY`", "key$": "prices", "index$": 8 }, "product_type": { "a": true, "h": "Product Type", "n": "product_type", "r": true, "t": "`$STRING`", "key$": "product_type", "index$": 9 }, "vendor_count": { "a": true, "h": "Vendor Count", "n": "vendor_count", "r": true, "t": "`$INTEGER`", "key$": "vendor_count", "index$": 10 } }, "id": { "field": "id", "name": "id" }, "name": "product", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /products", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "peptides", "k": "query", "n": "category", "or": "category", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "id,peptide,form", "k": "query", "n": "field", "or": "fields", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "vial", "k": "query", "n": "form", "or": "form", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "in_stock", "or": "in_stock", "r": false, "t": "`$BOOLEAN`", "index$": 4 }, { "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 5 }, { "a": true, "ex": "bpc-157", "k": "query", "n": "peptide", "or": "peptide", "r": false, "t": "`$STRING`", "index$": 6 }, { "a": true, "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 7 }, { "a": true, "ex": "US", "k": "query", "n": "ships_to", "or": "ships_to", "r": false, "t": "`$STRING`", "index$": 8 }, { "a": true, "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 9 }, { "a": true, "k": "query", "n": "vendor", "or": "vendor", "r": false, "t": "`$STRING`", "index$": 10 }] }, "k": "http", "m": "GET", "o": "/products", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "products" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /products/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "bpc-157::vial", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "US", "k": "query", "n": "ships_to", "or": "ships_to", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/products/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "products" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "product", "name__orig": "product", "Name": "Product", "name_": "product", "name-": "product", "NAME": "PRODUCT", "index$": 3 }, { "active": true, "entity": "product", "key$": "BasicProductFlow", "kind": "basic", "name": "BasicProductFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "product_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "product_ref01", "srcdatavar": "product_ref01_data", "suffix": "_dt0" }, "m": { "id": "product01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-product_ref01" } }], "index$": 1, "route": "GET /products/{id}", "record": {} }] }, 'Product', { "GET /products": { "protocol": "http", "parameters": [{ "name": "search", "in": "query", "required": false, "description": "Product or compound name.", "schema": { "type": "string", "maxLength": 200 }, "index$": 0 }, { "name": "peptide", "in": "query", "required": false, "description": "Peptide id, name or alias.", "schema": { "type": "string" }, "example": "bpc-157", "index$": 1 }, { "name": "category", "in": "query", "required": false, "description": "Comma-separated product types.", "schema": { "type": "string" }, "example": "peptides", "index$": 2 }, { "name": "form", "in": "query", "required": false, "description": "Comma-separated forms: vial, solution, pen, nasal_spray, oral_spray, spray, capsule, tablet, topical, liquid, bulk_powder, other, unknown.", "schema": { "type": "string" }, "example": "vial", "index$": 3 }, { "name": "ships_to", "in": "query", "required": false, "description": "Shipping destination: ISO 3166-1 alpha-2 country (\"US\") or subdivision (\"US-CA\"). Adds `ships_to` to each result; `unknown` is never treated as ships.", "schema": { "type": "string", "pattern": "^[A-Za-z]{2}(-[A-Za-z0-9]{1,3})?$" }, "example": "US", "index$": 4 }, { "name": "in_stock", "in": "query", "required": false, "description": "Only in-stock offers.", "schema": { "type": "boolean" }, "index$": 5 }, { "name": "sort", "in": "query", "required": false, "description": "Order (default `name`).", "schema": { "type": "string", "enum": ["name", "offers", "vendors"] }, "index$": 6 }, { "name": "vendor", "in": "query", "required": false, "description": "Vendor id or slug.", "schema": { "type": "string" }, "index$": 7 }, { "name": "limit", "in": "query", "required": false, "description": "Results per page (1-100, default 20).", "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20 }, "index$": 8 }, { "name": "cursor", "in": "query", "required": false, "description": "Opaque cursor from `pagination.next_cursor` of the previous page.", "schema": { "type": "string" }, "index$": 9 }, { "name": "fields", "in": "query", "required": false, "description": "Comma-separated fields to return for each item (`id` is always included). One of: id, peptide, form, product_type, offer_count, vendor_count, in_stock_count, prices, last_seen_at, api_url.", "schema": { "type": "string" }, "example": "id,peptide,form", "index$": 10 }] }, "GET /products/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Product id: peptide id and form, e.g. `bpc-157::vial`.", "schema": { "type": "string" }, "example": "bpc-157::vial", "index$": 0 }, { "name": "ships_to", "in": "query", "required": false, "description": "Shipping destination: ISO 3166-1 alpha-2 country (\"US\") or subdivision (\"US-CA\"). Adds `ships_to` to each result; `unknown` is never treated as ships.", "schema": { "type": "string", "pattern": "^[A-Za-z]{2}(-[A-Za-z0-9]{1,3})?$" }, "example": "US", "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let product_ref01_data = Object.values(setup.data.existing.product)[0];
        // LIST
        const product_ref01_ent = client.Product();
        const product_ref01_match = {};
        const product_ref01_list = (await product_ref01_ent.list(product_ref01_match)).map((e) => e.data());
        // LOAD
        const product_ref01_match_dt0 = {};
        product_ref01_match_dt0.id = product_ref01_data.id;
        const product_ref01_data_dt0 = (await product_ref01_ent.load(product_ref01_match_dt0)).data();
        (0, node_assert_1.default)(product_ref01_data_dt0.id === product_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/product/ProductTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PeptideLibrarySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['product01', 'product02', 'product03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'PEPTIDE_LIBRARY_TEST_PRODUCT_ENTID': idmap,
        'PEPTIDE_LIBRARY_TEST_LIVE': 'FALSE',
        'PEPTIDE_LIBRARY_TEST_EXPLAIN': 'FALSE',
        'PEPTIDE_LIBRARY_APIKEY': '',
    });
    idmap = env['PEPTIDE_LIBRARY_TEST_PRODUCT_ENTID'];
    const live = 'TRUE' === env.PEPTIDE_LIBRARY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['PEPTIDE_LIBRARY_TEST_PRODUCT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.PeptideLibrarySDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.PEPTIDE_LIBRARY_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.PEPTIDE_LIBRARY_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ProductEntity.test.js.map