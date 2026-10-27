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
(0, node_test_1.describe)('PriceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when PEPTIDE_LIBRARY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('PEPTIDE_LIBRARY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PeptideLibrarySDK.test();
        const ent = testsdk.Price();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('price hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.PeptideLibrarySDK.test(offline).Price().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.PeptideLibrarySDK.test(offline).Price()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.PeptideLibrarySDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Price().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.PeptideLibrarySDK.test().Price().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.PeptideLibrarySDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Price().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Price().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.PeptideLibrarySDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Price().list({ "category": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.PEPTIDE_LIBRARY_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'price.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "availability": { "a": true, "h": "Availability", "n": "availability", "r": true, "t": "`$STRING`", "key$": "availability", "index$": 0 }, "currency": { "a": true, "h": "Currency", "n": "currency", "r": true, "t": "`$STRING`", "key$": "currency", "index$": 1 }, "first_seen_at": { "a": true, "h": "First Seen At", "n": "first_seen_at", "r": true, "t": "`$ANY`", "key$": "first_seen_at", "index$": 2 }, "form": { "a": true, "h": "Form", "n": "form", "r": true, "t": "`$STRING`", "key$": "form", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Offer id.", "t": "`$STRING`", "key$": "id", "index$": 4 }, "is_affiliate_link": { "a": true, "h": "Is Affiliate Link", "n": "is_affiliate_link", "r": true, "t": "`$BOOLEAN`", "key$": "is_affiliate_link", "index$": 5 }, "is_stale": { "a": true, "h": "Is Stale", "n": "is_stale", "r": true, "sh": "True when not seen in the last 7 days.", "t": "`$BOOLEAN`", "key$": "is_stale", "index$": 6 }, "last_seen_at": { "a": true, "h": "Last Seen At", "n": "last_seen_at", "r": true, "sh": "When the price was last seen on the vendor's site.", "t": "`$ANY`", "key$": "last_seen_at", "index$": 7 }, "peptide": { "a": true, "h": "Peptide", "n": "peptide", "r": true, "t": "`$OBJECT`", "key$": "peptide", "index$": 8 }, "price": { "a": true, "h": "Price", "n": "price", "r": true, "sh": "Decimal amount as a string, never a float.", "t": "`$STRING`", "key$": "price", "index$": 9 }, "price_changed_at": { "a": true, "h": "Price Changed At", "n": "price_changed_at", "r": true, "t": "`$ANY`", "key$": "price_changed_at", "index$": 10 }, "price_per_mg": { "a": true, "h": "Price Per Mg", "n": "price_per_mg", "r": true, "t": "`$ANY`", "key$": "price_per_mg", "index$": 11 }, "price_per_unit": { "a": true, "h": "Price Per Unit", "n": "price_per_unit", "r": true, "t": "`$ANY`", "key$": "price_per_unit", "index$": 12 }, "product_id": { "a": true, "h": "Product Id", "n": "product_id", "r": true, "t": "`$STRING`", "key$": "product_id", "index$": 13 }, "product_name": { "a": true, "h": "Product Name", "n": "product_name", "r": true, "sh": "As the vendor lists it.", "t": "`$STRING`", "key$": "product_name", "index$": 14 }, "product_page_url": { "a": true, "h": "Product Page Url", "n": "product_page_url", "r": true, "sh": "Peptide Library redirect to the vendor's page; logs the click.", "t": "`$STRING`", "key$": "product_page_url", "index$": 15 }, "product_type": { "a": true, "h": "Product Type", "n": "product_type", "r": true, "t": "`$STRING`", "key$": "product_type", "index$": 16 }, "regular_price": { "a": true, "h": "Regular Price", "n": "regular_price", "r": true, "t": "`$ANY`", "key$": "regular_price", "index$": 17 }, "ships_to": { "a": true, "h": "Ships To", "n": "ships_to", "r": true, "sh": "Shipping to the `ships_to` destination you asked about; null when you didn't ask.", "t": "`$ANY`", "key$": "ships_to", "index$": 18 }, "strength": { "a": true, "h": "Strength", "n": "strength", "r": true, "t": "`$OBJECT`", "key$": "strength", "index$": 19 }, "vendor": { "a": true, "h": "Vendor", "n": "vendor", "r": true, "t": "`$OBJECT`", "key$": "vendor", "index$": 20 } }, "id": { "field": "id", "name": "id" }, "name": "price", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /prices", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "peptides", "k": "query", "n": "category", "or": "category", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "USD", "k": "query", "n": "currency", "or": "currency", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "id,product_id,product_name", "k": "query", "n": "field", "or": "fields", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "vial", "k": "query", "n": "form", "or": "form", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "k": "query", "n": "in_stock", "or": "in_stock", "r": false, "t": "`$BOOLEAN`", "index$": 5 }, { "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 6 }, { "a": true, "ex": "bpc-157", "k": "query", "n": "peptide", "or": "peptide", "r": false, "t": "`$STRING`", "index$": 7 }, { "a": true, "k": "query", "n": "price_max", "or": "price_max", "r": false, "t": "`$NUMBER`", "index$": 8 }, { "a": true, "k": "query", "n": "price_min", "or": "price_min", "r": false, "t": "`$NUMBER`", "index$": 9 }, { "a": true, "k": "query", "n": "product", "or": "product", "r": false, "t": "`$STRING`", "index$": 10 }, { "a": true, "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 11 }, { "a": true, "ex": "US", "k": "query", "n": "ships_to", "or": "ships_to", "r": false, "t": "`$STRING`", "index$": 12 }, { "a": true, "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 13 }, { "a": true, "k": "query", "n": "strength_max_mg", "or": "strength_max_mg", "r": false, "t": "`$NUMBER`", "index$": 14 }, { "a": true, "k": "query", "n": "strength_min_mg", "or": "strength_min_mg", "r": false, "t": "`$NUMBER`", "index$": 15 }, { "a": true, "k": "query", "n": "vendor", "or": "vendor", "r": false, "t": "`$STRING`", "index$": 16 }] }, "k": "http", "m": "GET", "o": "/prices", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "prices" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /prices/compare", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "currency", "or": "currency", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "form", "or": "form", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "in_stock", "or": "in_stock", "r": false, "t": "`$BOOLEAN`", "index$": 2 }, { "a": true, "ex": "bpc-157", "k": "query", "n": "peptide", "or": "peptide", "r": true, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "US", "k": "query", "n": "ships_to", "or": "ships_to", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/prices/compare", "q": { "$action": "compare", "exist": ["peptide"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "prices" }, { "lit": "compare" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "price", "name__orig": "price", "Name": "Price", "name_": "price", "name-": "price", "NAME": "PRICE", "index$": 2 }, { "active": true, "entity": "price", "key$": "BasicPriceFlow", "kind": "basic", "name": "BasicPriceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "price_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "price_ref01", "srcdatavar": "price_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-price_ref01" } }], "index$": 1 }] }, 'Price', { "GET /prices": { "protocol": "http", "parameters": [{ "name": "search", "in": "query", "required": false, "description": "Product or compound name.", "schema": { "type": "string", "maxLength": 200 }, "index$": 0 }, { "name": "peptide", "in": "query", "required": false, "description": "Peptide id, name or alias.", "schema": { "type": "string" }, "example": "bpc-157", "index$": 1 }, { "name": "category", "in": "query", "required": false, "description": "Comma-separated product types.", "schema": { "type": "string" }, "example": "peptides", "index$": 2 }, { "name": "form", "in": "query", "required": false, "description": "Comma-separated forms: vial, solution, pen, nasal_spray, oral_spray, spray, capsule, tablet, topical, liquid, bulk_powder, other, unknown.", "schema": { "type": "string" }, "example": "vial", "index$": 3 }, { "name": "ships_to", "in": "query", "required": false, "description": "Shipping destination: ISO 3166-1 alpha-2 country (\"US\") or subdivision (\"US-CA\"). Adds `ships_to` to each result; `unknown` is never treated as ships.", "schema": { "type": "string", "pattern": "^[A-Za-z]{2}(-[A-Za-z0-9]{1,3})?$" }, "example": "US", "index$": 4 }, { "name": "in_stock", "in": "query", "required": false, "description": "Only in-stock offers.", "schema": { "type": "boolean" }, "index$": 5 }, { "name": "product", "in": "query", "required": false, "description": "Comma-separated product ids (`<peptide>::<form>`).", "schema": { "type": "string" }, "index$": 6 }, { "name": "currency", "in": "query", "required": false, "description": "ISO 4217 currency of the listed price.", "schema": { "type": "string", "pattern": "^[A-Za-z]{3}$" }, "example": "USD", "index$": 7 }, { "name": "price_min", "in": "query", "required": false, "description": "Minimum listed price.", "schema": { "type": "number", "minimum": 0 }, "index$": 8 }, { "name": "price_max", "in": "query", "required": false, "description": "Maximum listed price.", "schema": { "type": "number", "minimum": 0 }, "index$": 9 }, { "name": "strength_min_mg", "in": "query", "required": false, "description": "Minimum listed strength in mg.", "schema": { "type": "number", "minimum": 0 }, "index$": 10 }, { "name": "strength_max_mg", "in": "query", "required": false, "description": "Maximum listed strength in mg.", "schema": { "type": "number", "minimum": 0 }, "index$": 11 }, { "name": "sort", "in": "query", "required": false, "description": "Order (default `price`).", "schema": { "type": "string", "enum": ["price", "-price", "price_per_mg", "updated", "newest", "vendor"] }, "index$": 12 }, { "name": "vendor", "in": "query", "required": false, "description": "Vendor id or slug.", "schema": { "type": "string" }, "index$": 13 }, { "name": "limit", "in": "query", "required": false, "description": "Results per page (1-100, default 20).", "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20 }, "index$": 14 }, { "name": "cursor", "in": "query", "required": false, "description": "Opaque cursor from `pagination.next_cursor` of the previous page.", "schema": { "type": "string" }, "index$": 15 }, { "name": "fields", "in": "query", "required": false, "description": "Comma-separated fields to return for each item (`id` is always included). One of: id, product_id, product_name, peptide, vendor, product_type, form, strength, price, regular_price, currency, price_per_mg, price_per_unit, availability, ships_to, last_seen_at, is_stale, first_seen_at, price_changed_at, product_page_url, is_affiliate_link.", "schema": { "type": "string" }, "example": "id,product_id,product_name", "index$": 16 }] }, "GET /prices/compare": { "protocol": "http", "parameters": [{ "name": "peptide", "in": "query", "required": true, "description": "Peptide id, name or alias.", "schema": { "type": "string" }, "example": "bpc-157", "index$": 0 }, { "name": "form", "in": "query", "required": false, "description": "Comma-separated forms.", "schema": { "type": "string" }, "index$": 1 }, { "name": "currency", "in": "query", "required": false, "description": "ISO 4217 currency.", "schema": { "type": "string", "pattern": "^[A-Za-z]{3}$" }, "index$": 2 }, { "name": "ships_to", "in": "query", "required": false, "description": "Shipping destination: ISO 3166-1 alpha-2 country (\"US\") or subdivision (\"US-CA\"). Adds `ships_to` to each result; `unknown` is never treated as ships.", "schema": { "type": "string", "pattern": "^[A-Za-z]{2}(-[A-Za-z0-9]{1,3})?$" }, "example": "US", "index$": 3 }, { "name": "in_stock", "in": "query", "required": false, "description": "Only in-stock offers.", "schema": { "type": "boolean" }, "index$": 4 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let price_ref01_data = Object.values(setup.data.existing.price)[0];
        // LIST
        const price_ref01_ent = client.Price();
        const price_ref01_match = {};
        const price_ref01_list = (await price_ref01_ent.list(price_ref01_match)).map((e) => e.data());
        // LOAD
        const price_ref01_match_dt0 = {};
        price_ref01_match_dt0.id = price_ref01_data.id;
        const price_ref01_data_dt0 = (await price_ref01_ent.load(price_ref01_match_dt0)).data();
        (0, node_assert_1.default)(price_ref01_data_dt0.id === price_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/price/PriceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PeptideLibrarySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['price01', 'price02', 'price03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'PEPTIDE_LIBRARY_TEST_PRICE_ENTID': idmap,
        'PEPTIDE_LIBRARY_TEST_LIVE': 'FALSE',
        'PEPTIDE_LIBRARY_TEST_EXPLAIN': 'FALSE',
        'PEPTIDE_LIBRARY_APIKEY': '',
    });
    idmap = env['PEPTIDE_LIBRARY_TEST_PRICE_ENTID'];
    const live = 'TRUE' === env.PEPTIDE_LIBRARY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['PEPTIDE_LIBRARY_TEST_PRICE_ENTID'];
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
//# sourceMappingURL=PriceEntity.test.js.map